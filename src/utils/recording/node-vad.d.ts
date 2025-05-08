declare module 'node-vad' {
  namespace Vad {
    enum Mode {
      NORMAL = 0,
      LOW_BITRATE = 1,
      AGGRESSIVE = 2,
      VERY_AGGRESSIVE = 3,
    }

    enum Event {
      SILENCE = 'silence',
      VOICE = 'voice',
      NOISE = 'noise',
      ERROR = 'error',
    }

    interface VadInstance {
      processAudio(buffer: Buffer, sampleRate: number): Promise<Event>;
    }
  }

  class Vad {
    constructor(mode: Vad.Mode);
    processAudio(buffer: Buffer, sampleRate: number): Promise<Vad.Event>;
  }

  export default Vad;
}
