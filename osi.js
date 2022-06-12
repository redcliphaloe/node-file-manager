import * as base from './base.js';
import os from 'os';

export const getInfo = async (prm) => {
  let res = '';  
  try {
    switch (prm) {
      case '--EOL':
        res = JSON.stringify(os.EOL.toString());
        break;
      case '--cpus':
        const cpus = os.cpus();
        res = `${cpus.length}\n`;
        for (let i =0; i < cpus.length; i++) {
          res += `${cpus[i].model}\n`;
        }
        break;
      case '--homedir':
        res = os.homedir();
        break;
      case '--username':
        res = os.userInfo().username;
        break;
      case '--architecture':
        res = os.arch();
        break;
      default:
        process.stdout.write('Invalid input\n');
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