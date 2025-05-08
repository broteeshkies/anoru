import Logger from '@lsk4/log';
import fs from 'fs';
import mic from 'mic';
import Vad from 'node-vad';
import ora from 'ora';

import { isDebug } from '../../config.js';
import { playFinishRecording, playStartRecording } from '../play.js';
import { getRecordingFilename } from './getRecordingFilename.js';

const log = new Logger({
  name: 'recording',
  level: isDebug ? 'trace' : 'error',
});

type RecordOptions = {
  maxDuration?: number;
  silence?: number;
};
/**
 * Записывает аудио с микрофона и сохраняет его в WAV-файл.
 * Функция автоматически обнаруживает паузы в речи и останавливает запись,
 * когда наступает тишина после речи или достигнута максимальная длительность.
 *
 * @param {RecordOptions} options - Настройки записи
 * @param {number} options.maxDuration - Максимальная длительность записи в секундах (по умолчанию 10 секунд)
 * @param {number} options.silence - Длительность тишины в секундах, после которой запись прекращается (по умолчанию 2 секунды)
 * @returns {Promise<string>} Путь к сохраненному аудиофайлу
 */
export async function recording(options: RecordOptions = {}): Promise<string> {
  const { maxDuration = 10, silence = 1 } = options;
  const filename = getRecordingFilename();

  const micInstance = mic({
    rate: '16000', // VAD работает с частотой 16kHz
    channels: '1', // VAD требует один канал
    fileType: 'wav',
    debug: false,
    encoding: 'signed-integer', // Для совместимости с VAD
    bitwidth: '16', // VAD требует 16-битный PCM
  });
  const micInputStream = micInstance.getAudioStream();
  const vadInstance = new Vad(Vad.Mode.VERY_AGGRESSIVE);

  let silenceStart: number | null = null;
  let speechDetected = false;
  let recordingTimeout: NodeJS.Timeout | null = null;

  const chunks: Buffer[] = [];

  const maxRecordingTime = setTimeout(() => {
    log.debug('Достигнута максимальная длительность записи');
    // eslint-disable-next-line @typescript-eslint/no-use-before-define
    stopRecording();
  }, maxDuration * 1000);

  function stopRecording() {
    if (recordingTimeout) {
      clearTimeout(recordingTimeout);
      recordingTimeout = null;
    }
    clearTimeout(maxRecordingTime);

    if (micInstance) {
      micInstance.stop();
      log.debug('Запись остановлена');
    }
  }

  // Создаем промис, который завершится при завершении записи
  const recordingPromise = new Promise<void>((resolve, reject) => {
    micInputStream.on('data', async (chunk: Buffer) => {
      // Сохраняем все данные для записи в файл
      chunks.push(chunk);

      // Анализируем чанк на наличие голоса с использованием try/catch вместо .then()
      try {
        const result: Vad.Event = await vadInstance.processAudio(chunk, 16000);
        switch (result) {
          case Vad.Event.SILENCE:
            if (speechDetected) {
              // Если уже была обнаружена речь и наступила тишина
              if (silenceStart === null) {
                silenceStart = Date.now();
              } else if (Date.now() - silenceStart > silence * 1000) {
                // Если тишина длится дольше указанного времени, останавливаем запись
                log.debug('Обнаружена тишина после речи, завершаем запись');
                stopRecording();
              }
            }
            break;
          case Vad.Event.VOICE:
            speechDetected = true;
            silenceStart = null;
            break;
          case Vad.Event.NOISE:
            // Игнорируем шум
            break;
          case Vad.Event.ERROR:
            log.warn('VAD обнаружил ошибку при обработке аудио');
            break;
          default:
            log.warn('Неизвестный результат VAD:', result);
            break;
        }
      } catch (err: unknown) {
        log.error('Ошибка при обработке аудио с VAD:', err);
      }
    });

    micInputStream.on('error', (err: any) => {
      log.error('Mic input stream error:', err);
      reject(err);
    });

    micInputStream.on('close', () => {
      log.debug('Mic input stream closed');

      // Записываем все собранные чанки в файл
      const buffer = Buffer.concat(chunks);
      fs.writeFileSync(filename, buffer);

      log.debug('Запись завершена и сохранена в', filename);
      resolve();
    });
  });

  const loading = ora({
    text: 'speak:',
    color: 'yellow',
    spinner: 'dots',
  }).start();
  await playStartRecording();
  log.debug('🎙️ Начните говорить...');
  micInstance.start();
  await recordingPromise;

  log.debug('Завершение записи');
  await playFinishRecording();
  loading.stop();

  return filename;
}
