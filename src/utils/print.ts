/* eslint-disable no-console */
import chalk from 'chalk';

import { anoruName, youName } from '../config.js';

const maxNameLength = youName.length > anoruName.length ? youName.length : anoruName.length;

/**
 * Prints a user message with appropriate formatting
 * @param message The message to print
 */
export function printYou(message: string): void {
  const paddedName = youName.padStart(maxNameLength);
  console.log(chalk.blue(`${paddedName}:`), message);
}

/**
 * Prints an Anoru message with appropriate formatting
 * @param message The message to print
 */
export function printAnoru(message: string): void {
  const paddedName = anoruName.padStart(maxNameLength);
  console.log(chalk.green(`${paddedName}:`), message);
}
