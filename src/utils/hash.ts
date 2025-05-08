import crypto from 'crypto';

/**
 * Creates an MD5 hash from a string
 * @param text The text to hash
 * @returns MD5 hash of the input text as a hex string
 */
export function createTextHash(text: string): string {
  return crypto.createHash('md5').update(text).digest('hex');
}
