/* eslint-disable no-console */
import chalk from 'chalk';

import { anoruName, youName } from '../config.js';

const max = (arr: number[]): number => arr.reduce((a, b) => Math.max(a, b), 0);
const maxNameLength = max([youName, anoruName, '1234567890'].map((i) => i.length));

export const printName = (name: string, offset: number = 0): string => {
  const paddedName = name.padStart(maxNameLength + offset);
  return paddedName;
};

export const printRole = (role: 'user' | 'assistant', offset: number = 0): string => {
  const name = role === 'user' ? youName : anoruName;
  const color = role === 'user' ? chalk.blue : chalk.green;
  return color(`${printName(name, offset)}:`);
};

export function print(message: string, role: 'user' | 'assistant'): void {
  console.log(printRole(role), message);
}
