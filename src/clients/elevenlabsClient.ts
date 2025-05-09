import axios from 'axios';

import {
  elevenlabsApiKey,
  elevenlabsModelId,
  elevenlabsVoiceId,
  elevenlabsVoiceSettings,
} from '../config.js';

// Function to create an Eleven Labs API client
export function createElevenlabsClient() {
  return axios.create({
    baseURL: 'https://api.elevenlabs.io/v1',
    headers: {
      'xi-api-key': elevenlabsApiKey,
      'Content-Type': 'application/json',
      Accept: 'audio/mpeg',
    },
  });
}
export const elevenlabsClient = createElevenlabsClient();

export async function textToSpeech(text: string) {
  const client = elevenlabsClient;
  return client.post(
    `/text-to-speech/${elevenlabsVoiceId}/stream`,
    {
      text,
      model_id: elevenlabsModelId,
      voice_settings: elevenlabsVoiceSettings,
      lang: 'ru',
      // model_id: 'eleven_multilingual_v1',
      // voice_settings: { stability: 0.3, similarity_boost: 0.8 },
    },
    {
      responseType: 'stream',
    },
  );
}
