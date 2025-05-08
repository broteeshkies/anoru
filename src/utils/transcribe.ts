import Logger from '@lsk4/log';
import fs from 'fs';
import OpenAI from 'openai';
import ora from 'ora';

import { isDebug, openaiApiKey } from '../config.js';

const log = new Logger({
  name: 'transcribe',
  level: isDebug ? 'trace' : 'error',
});

// Initialize OpenAI
const openai = new OpenAI({ apiKey: openaiApiKey });

// Transcribe audio using OpenAI Whisper
export async function transcribe(filename: string): Promise<string> {
  const loading = ora({
    text: 'transribing...',
    spinner: 'dots',
  }).start();

  log.debug('Transcribing audio...');

  const transcription = await openai.audio.transcriptions.create({
    file: fs.createReadStream(filename),
    model: 'whisper-1',
    language: 'ru',
    response_format: 'text',
  });

  log.trace('Transcription result:', transcription);
  loading.stop();

  return transcription.trim();
}
