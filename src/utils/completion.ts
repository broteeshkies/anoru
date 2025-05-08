import Logger from '@lsk4/log';

import { openai } from '../clients/openaiClient.js';
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
  const props = {
    model: 'gpt-3.5-turbo',
    temperature: 0.7,
    max_tokens: 100,
    messages,
  };

  log.trace('Completion props:', props);
  const res = await openai.chat.completions.create(props);

  return res.choices[0].message.content || '';
}
