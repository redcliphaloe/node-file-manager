import os from 'os';
import * as base from './base.js';

export const getInfo = (prm) => {
  try {
    let res = '';
    switch (prm) {
      case '--EOL':
        res = JSON.stringify(base.EOL);
        break;
      case '--cpus':
        let cpus = os.cpus();
        cpus = cpus.map(v => ({model: v.model, 'clock rate': `${(Math.round(v.speed / 100) / 10).toFixed(2)}GHz`}));
        process.stdout.write(`CPUS count: ${cpus.length}${base.EOL}`);
        console.table(cpus);
        return;
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
        base.printInvalid();
        return;
    }
    process.stdout.write(`${res}${base.EOL}`);
  } catch (error) {
    base.printError(error);
  }
};
