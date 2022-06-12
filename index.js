import * as base from './base.js';
import * as nwd from './nwd.js';
import * as hash from './hash.js';

process.on('SIGINT', base.exit);

process.stdin.on('data', (chunk) => {
  const cmd = chunk.toString().trim().split(' ');
  switch (cmd[0]) {
    case '.exit':
      base.exit();
      break;
    case 'up':
      nwd.up();
      break;
    case 'cd':
      nwd.cd(cmd[1]);
      break;
    case 'ls':
      nwd.ls();
      break;
    case 'hash':
      hash.getHash(cmd[1]);
      break;
    default:
      base.printInvalid();
      break;
  }
});

base.enter();