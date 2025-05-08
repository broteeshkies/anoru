import fs from 'fs';
import path from 'path';

import { recordingsDir } from '../../config.js';

export function getRecordingFilename(): string {
  const timestamp = new Date()
    .toISOString()
    .replace(/[ZT:.]/g, ' ')
    .trim()
    .replace(/ /g, '-');

  const filename = path.join(recordingsDir, `${timestamp}.wav`);

  if (!fs.existsSync(recordingsDir)) {
    fs.mkdirSync(recordingsDir, { recursive: true });
  }

  return filename;
}
