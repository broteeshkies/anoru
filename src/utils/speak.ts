import Logger from '@lsk4/log';

import { isDebug } from '../config.js';
import { play } from './play.js';
import { tts } from './tts.js';

const log = new Logger({
  name: 'speak',
  level: isDebug ? 'trace' : 'error',
});

export async function speak(text: string): Promise<void> {
  log.debug('Speaking:', text);
  const file = await tts(text);
  await play(file);
}
