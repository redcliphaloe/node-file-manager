import * as base from './base.js';
import os from 'os';

export const getInfo = async (prm) => {
  let res = '';  
  try {
    switch (prm) {
      case '--EOL':
        res = JSON.stringify(os.EOL.toString());
        break;
      default:
        process.stdout.write('Operation failed\n');
        base.printCurrentDir();
        return;
        break;
    }
    process.stdout.write(`${res}\n`);
    base.printCurrentDir();
  } catch (err) {
    process.stdout.write('Operation failed\n');
    base.printCurrentDir();
  }
}