import * as base from './base.js';
import * as nwd from './nwd.js';
import * as files from './files.js';
import * as osi from './osi.js';
import * as hash from './hash.js';

process.on('SIGINT', base.exit);
process.stdin.on('data', async (chunk) => {
  const cmd = nwd.parseCmdToArr(chunk.toString());
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
      await nwd.ls(cmd[1]);
      break;
    case 'cat':
      files.cat(cmd[1]);
      return;
    case 'add':
      files.add(cmd[1]);
      return;
    case 'rn':
      await files.rn(cmd[1], cmd[2]);
      break;
    case 'cp':
      files.cp(cmd[1], cmd[2]);
      return;
    case 'mv':
      files.mv(cmd[1], cmd[2]);
      return;
    case 'rm':
      await files.rm(cmd[1]);
      break;
    case 'os':
      osi.getInfo(cmd[1]);
      break;
    case 'hash':
      hash.getHash(cmd[1]);
      return;
    default:
      base.printInvalid();
      break;
  }
  base.printCurrentDir();
});

base.enter();
