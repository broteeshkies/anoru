import player from 'play-sound';

import { finishRecordingFilename, startRecordingFilename } from '../config.js';

// Play audio file
export function play(file: string): Promise<void> {
  return new Promise<void>((res, rej) => {
    player().play(file, (err: Error | null) => (err ? rej(err) : res()));
  });
}

export function playStartRecording(): Promise<void> {
  return play(startRecordingFilename);
}

export function playFinishRecording(): Promise<void> {
  return play(finishRecordingFilename);
}
