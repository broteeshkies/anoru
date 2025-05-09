export function checkEnvs() {
  if (!process.env.OPENAI_API_KEY) {
    return false;
  }
  if (!process.env.ELEVENLABS_API_KEY) {
    return false;
  }
  return true;
}
