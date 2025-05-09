import fs from 'fs';
import path from 'path';

import { ttsDir } from '../../config.js';
import { createTextHash } from '../hash.js';

export function getTtsFilename(text: string): string {
  const hash = createTextHash(text);
  const filename = path.join(ttsDir, `${hash}.mp3`);
  if (!fs.existsSync(ttsDir)) {
    fs.mkdirSync(ttsDir, { recursive: true });
  }
  return filename;
}
