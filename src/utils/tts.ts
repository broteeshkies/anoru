import fs from 'fs';
import path from 'path';

import { textToSpeech } from '../clients/elevenlabsClient.js';
import { ttsDir } from '../config.js';
import { createTextHash } from './hash.js';

// Text-to-speech using ElevenLabs API
export async function tts(text: string): Promise<string> {
  // Create a hash of the text to use as filename
  const hash = createTextHash(text);
  const filename = `${hash}.mp3`;

  // Ensure the directory exists
  if (!fs.existsSync(ttsDir)) {
    fs.mkdirSync(ttsDir, { recursive: true });
  }

  const filePath = path.join(ttsDir, filename);

  // Check if file already exists (cached version)
  if (fs.existsSync(filePath)) {
    // Return the existing file path if the file already exists
    return filePath;
  }

  // If file doesn't exist, generate it
  const response = await textToSpeech(text);

  const write = fs.createWriteStream(filePath);
  response.data.pipe(write);

  await new Promise<void>((res) => write.on('finish', () => res()));
  return filePath;
}
