import 'dotenv/config';

import { helloWorldPhrase } from './config.js';
import { addMessage } from './utils/chat.js';
import { completion } from './utils/completion.js';
import { playFinishRecording } from './utils/play.js';
import { printAnoru, printYou } from './utils/print.js';
import { recording } from './utils/recording/recording.js';
import { speak } from './utils/speak.js';
import { transcribe } from './utils/transcribe.js';

function isContinue() {
  return true;
}

export async function main() {
  await playFinishRecording();
  addMessage('assistant', helloWorldPhrase);
  printAnoru(helloWorldPhrase);
  await speak(helloWorldPhrase);

  while (isContinue()) {
    const filename = await recording();
    // const filename = `${assetsDir}/record.wav`;
    // await play(filename);
    const text = await transcribe(filename);
    addMessage('user', text);
    printYou(text);
    const reply = await completion();
    addMessage('assistant', reply);
    printAnoru(reply);
    await speak(reply);
  }
}
