import fs, { existsSync } from 'node:fs';

import { textToSpeech } from '../clients/elevenlabsClient.js';
import { getTtsFilename } from './recording/getTtsFilename.js';

export async function tts(text: string, filename?: string): Promise<string> {
  const filePath = filename || getTtsFilename(text);
  if (existsSync(filePath)) {
    return filePath;
  }
  const response = await textToSpeech(text);
  const write = fs.createWriteStream(filePath);
  response.data.pipe(write);
  await new Promise<void>((res) => write.on('finish', () => res()));
  return filePath;
}
