import { existsSync } from 'fs';
import ora from 'ora';

import { addMessage } from './chat.js';
import { play } from './play.js';
import { print, printRole } from './print.js';
import { tts } from './tts.js';

export async function playWithText(text: string, filename: string, role: 'user' | 'assistant') {
  const loading = ora({
    text: `${printRole(role, -2)} ${text}`,
    spinner: 'dots',
    color: 'yellow',
  }).start();
  await play(filename);
  loading.stop();
}

export async function speak({
  text,
  filename,
  role,
}: {
  text: string;
  filename?: string;
  role: 'user' | 'assistant';
}): Promise<void> {
  let file = filename;

  if (!file || !existsSync(file)) {
    file = await tts(text, filename);
  }

  addMessage(role, text);
  await playWithText(text, file, role);
  print(text, role);

  // if (filename && existsSync(filename)) {
  //   log.debug('Speaking from file:', filename);
  //   // await play(filename);
  //   await playWithText(text, filename, role);
  //   return;
  // }
  // log.debug('Speaking:', text);
  // addMessage(role, text);
  // const file = await tts(text, filename);
  // await playWithText(text, file, role);
  // print(text, role);
}
