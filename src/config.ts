import { resolve } from 'node:path';

import { config as dotenvConfig } from 'dotenv';
import { z } from 'zod';

dotenvConfig();
dotenvConfig({
  path: '~/.anoru',
});

const configSchema = z.object({
  openaiApiKey: z.string({
    required_error: 'OPENAI_API_KEY is required in environment variables',
  }),
  elevenlabsApiKey: z.string({
    required_error: 'ELEVENLABS_API_KEY is required in environment variables',
  }),
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
export const ELEVENLABS_VOICE_ID = 'EXAVITQu4vr4xnSDxMaL';

// export const helloWorldPhrase =
//   'Hello world. My name is Anoru. I am your voice assistant. How can I help you?';
export const helloWorldPhrase =
  'Hello world. Меня зовут Anoru. Я ваш голосовой помощник. Чем могу помочь?';
export const startRecordingFilename = resolve(assetsDir, 'start_recording.wav');
export const finishRecordingFilename = resolve(assetsDir, 'finish_recording.wav');
export const isDebug = false;

export const youName = process.env.USER || 'you';
export const anoruName = 'anoru';

export const systemPrompt = `You are a voice assistant named ${anoruName}. You are friendly and helpful. You can answer questions, provide information, and assist with tasks. You can also speak in Russian. Your name is ${anoruName}.`;
