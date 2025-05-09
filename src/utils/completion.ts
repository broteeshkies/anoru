import Logger from '@lsk4/log';

import { createChatCompletion } from '../clients/openaiClient.js';
import { isDebug, systemPrompt } from '../config.js';
import { chat } from './chat.js';

const log = new Logger({
  name: 'completion',
  level: isDebug ? 'trace' : 'error',
});

export async function completion(): Promise<string> {
  const messages = [{ role: 'system', content: systemPrompt }, ...chat.messages.slice(-5)] as {
    role: 'user' | 'assistant' | 'system';
    content: string;
  }[];

  log.trace('Completion props:', messages);
  const res = await createChatCompletion(messages);
  return res.choices[0].message.content || '';
}
