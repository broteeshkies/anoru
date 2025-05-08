import './config.js';

import { log } from './log.js';
import { main } from './main.js';

main().catch((err) => {
  log.fatal('Failed to execute', err);
  process.exit(1);
});
