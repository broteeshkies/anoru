import 'dotenv/config';

import terminalImage from 'terminal-image';

import {
  brosImage,
  byeWorldFilename,
  byeWorldPhrase,
  hasNoEnvsFilename,
  hasNoEnvsPhrase,
  helloWorldFilename,
  helloWorldPhrase,
} from './config.js';
import { addMessage, chat } from './utils/chat.js';
import { checkEnvs } from './utils/checkEnvs.js';
import { completion } from './utils/completion.js';
import { playFinishRecording } from './utils/play.js';
import { print } from './utils/print.js';
import { recording } from './utils/recording/recording.js';
import { speak } from './utils/speak.js';
import { transcribe } from './utils/transcribe.js';

function isContinue() {
  return checkEnvs() && chat.messages.length < 5;
}
function isNeedReply() {
  return chat.messages.length > 0 && chat.messages[chat.messages.length - 1].role === 'user';
}
function isNeedAsk() {
  return chat.messages.length === 0 || chat.messages[chat.messages.length - 1].role === 'assistant';
}
async function printAds() {
  console.log(await terminalImage.file(brosImage));
  console.log('https://t.me/broschat');
  console.log('https://t.me/brospoiler');
}

export async function main() {
  await playFinishRecording();
  await speak({
    text: helloWorldPhrase,
    filename: helloWorldFilename,
    role: 'assistant',
  });
  if (!checkEnvs()) {
    await playFinishRecording();
    await speak({
      text: hasNoEnvsPhrase,
      filename: hasNoEnvsFilename,
      role: 'assistant',
    });
    await printAds();
    process.exit(0);
    return;
  }
  while (true) {
    if (!isContinue()) {
      await playFinishRecording();
      await speak({
        text: byeWorldPhrase,
        filename: byeWorldFilename,
        role: 'assistant',
      });
      await printAds();
      process.exit(0);
      return;
    }
    if (isNeedReply()) {
      const reply = await completion();
      addMessage('assistant', reply);
      await speak({
        text: reply,
        role: 'assistant',
      });
    }
    if (isNeedAsk()) {
      const filename = await recording();
      // const filename = `${assetsDir}/record.wav`;
      // await play(filename);
      const text = await transcribe(filename);
      addMessage('user', text);
      print(text, 'user');
    }
  }
}
