import { resolve } from 'node:path';

import { config as dotenvConfig } from 'dotenv';
import { z } from 'zod';

dotenvConfig();
dotenvConfig({
  path: '~/.anoru',
});

const configSchema = z.object({
  openaiApiKey: z
    .string({
      // required_error: 'OPENAI_API_KEY is required in environment variables',
    })
    .optional(),
  elevenlabsApiKey: z
    .string({
      // required_error: 'ELEVENLABS_API_KEY is required in environment variables',
    })
    .optional(),
});

const config = configSchema.parse({
  openaiApiKey: process.env.OPENAI_API_KEY,
  elevenlabsApiKey: process.env.ELEVENLABS_API_KEY,
});

export const maxVideos = 20;
export const { openaiApiKey, elevenlabsApiKey } = config;

const __dirname = new URL('.', import.meta.url).pathname;
export const assetsDir = resolve(__dirname, '../assets');
export const tmpDir = resolve(__dirname, '../tmp');
export const ttsDir = resolve(tmpDir, 'tts');
export const recordingsDir = resolve(tmpDir, 'recordings');

// ElevenLabs voice ID - hardcoded value
export const elevenlabsVoiceId = 'XrExE9yKIg1WjnnlVkGX'; // ELEVENLABS_VOICE_ID = 'EXAVITQu4vr4xnSDxMaL';
export const elevenlabsModelId = 'eleven_multilingual_v2';
export const elevenlabsVoiceSettings = {
  stability: 0.5,
  similarity_boost: 0.5,
  style: 0,
  use_speaker_boost: true,
};

// export const helloWorldPhrase =
//   'Hello world. My name is Anoru. I am your voice assistant. How can I help you?';
export const helloWorldPhrase =
  'Привет Братишка! Меня зовут доктор Anoru. Я ваш голосовой помощник. Чем могу помочь, брат?';
export const helloWorldFilename = resolve(assetsDir, 'hello_world.mp3');
export const hasNoEnvsPhrase =
  // eslint-disable-next-line max-len
  'У вас нету прав на использование этого бота или вы забыли указать переменные окружения. Пожалуйста, обратитесь к Анору в братишкочат: (Telegram @broschat) и попросите его помочь вам.';
export const hasNoEnvsFilename = resolve(assetsDir, 'no_envs.mp3');
export const byeWorldPhrase =
  // eslint-disable-next-line max-len
  'Ну чтоже, я пошел - дальше думать о том, как сделать так, чтобы вы не задавали мне глупых вопросов. Надеюсь, вам понравилось со мной общаться. Если у вас есть какие-то вопросы или предложения, пожалуйста, дайте мне знать. Ставьте лайки, подписывайтесь на телеграм канал Добрый Доктор Анору на чатик с сериалами. Пишите Анору в братишкочат: (Telegram @broschat).  Я всегда готов помочь. Всего хорошего!';
export const byeWorldFilename = resolve(assetsDir, 'bye_world.mp3');

export const startRecordingFilename = resolve(assetsDir, 'start_recording.wav');
export const finishRecordingFilename = resolve(assetsDir, 'finish_recording.wav');
export const isDebug = false;

export const youName = process.env.USER || 'you';
export const anoruName = 'anoru';

// eslint-disable-next-line max-len
export const systemPrompt = `You are a voice assistant named ${anoruName}. You are friendly and helpful. You can answer questions, provide information, and assist with tasks. You can also speak in Russian. Your name is ${anoruName}.`;
