import Logger from '@lsk4/log';
import chalk from 'chalk';
import fs from 'fs';
import ora from 'ora';

import { createAudioTranscription } from '../clients/openaiClient.js';
import { isDebug } from '../config.js';
import { printName } from './print.js';

const log = new Logger({
  name: 'transcribe',
  level: isDebug ? 'trace' : 'error',
});

export async function transcribe(filename: string): Promise<string> {
  const loading = ora({
    text: `${chalk.yellow(printName('speak:', -1))} transcribing...`,
    color: 'yellow',
    spinner: 'dots',
  }).start();

  log.debug('Transcribing audio...');

  const transcription = await createAudioTranscription(fs.createReadStream(filename));

  log.trace('Transcription result:', transcription);
  loading.stop();

  return transcription.trim();
}
