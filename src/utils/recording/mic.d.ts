declare module 'mic' {
  interface MicOptions {
    rate: string;
    channels: string;
    fileType: string;
    debug?: boolean;
    encoding?: string;
    bitwidth?: string;
  }

  interface MicInstance {
    start(): void;
    stop(): void;
    getAudioStream(): NodeJS.ReadableStream;
  }

  const mic: (options: MicOptions) => MicInstance;
  export default mic;
}
