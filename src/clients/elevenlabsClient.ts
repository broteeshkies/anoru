import axios from 'axios';

import { ELEVENLABS_VOICE_ID, elevenlabsApiKey } from '../config.js';

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

// Export a default client instance
export const elevenlabsClient = createElevenlabsClient();

// Helper function to use the client for text-to-speech
export async function textToSpeech(text: string) {
  const client = elevenlabsClient;
  return client.post(
    `/text-to-speech/${ELEVENLABS_VOICE_ID}/stream`,
    {
      text,
      model_id: 'eleven_multilingual_v1',
      voice_settings: { stability: 0.3, similarity_boost: 0.8 },
    },
    {
      responseType: 'stream',
    },
  );
}
