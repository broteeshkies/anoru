import OpenAI from 'openai';

import { openaiApiKey } from '../config.js';

// Create and export the OpenAI client instance
export const openai = new OpenAI({ apiKey: openaiApiKey });

// Helper function to use the client for chat completions
export async function createChatCompletion(
  messages: OpenAI.Chat.ChatCompletionMessageParam[],
  options = {},
) {
  return openai.chat.completions.create({
    model: 'gpt-3.5-turbo',
    messages,
    ...options,
  });
}
