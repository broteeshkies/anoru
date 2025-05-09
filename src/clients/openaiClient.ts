import { ReadStream } from 'node:fs';

import OpenAI from 'openai';

import { openaiApiKey } from '../config.js';

let openaiClient: OpenAI | null = null;

// Helper function to use the client for chat completions
export async function createChatCompletion(
  messages: OpenAI.Chat.ChatCompletionMessageParam[],
  options: OpenAI.Chat.ChatCompletionStreamOptions = {},
) {
  if (!openaiClient) {
    openaiClient = new OpenAI({ apiKey: openaiApiKey });
  }
  return openaiClient.chat.completions.create({
    messages,

    model: 'gpt-3.5-turbo',
    temperature: 0.7,
    max_tokens: 100,
    ...options,
  });
}

export async function createAudioTranscription(
  file: ReadStream,
  options: Record<string, any> = {},
) {
  if (!openaiClient) {
    openaiClient = new OpenAI({ apiKey: openaiApiKey });
  }
  return openaiClient.audio.transcriptions.create({
    file,
    model: 'whisper-1',
    language: 'ru',
    response_format: 'text',
    ...options,
  });
}
