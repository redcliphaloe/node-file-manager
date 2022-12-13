import * as base from './base.js';
import * as nwd from './nwd.js';

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
    default:
      base.printInvalid();
      break;
  }
  base.printCurrentDir();
});

base.enter();
