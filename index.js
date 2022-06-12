import * as base from './base.js';
import * as nwd from './nwd.js';
import * as files from './files.js';
import * as osi from './osi.js';
import * as hash from './hash.js';
import * as zip from './zip.js';

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
    case 'cat':
      files.cat(cmd[1]);
      break;
    case 'os':
      osi.getInfo(cmd[1]);
      break;
    case 'hash':
      hash.getHash(cmd[1]);
      break;
    case 'compress':
      zip.compress(cmd[1], cmd[2]);
      break;
    case 'decompress':
      zip.decompress(cmd[1], cmd[2]);
      break;
    default:
      base.printInvalid();
      break;
  }
});

base.enter();