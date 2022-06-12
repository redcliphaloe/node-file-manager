import * as base from './base.js';
import fs from 'fs/promises';

export const up = () => {
  process.chdir('..');
  base.printCurrentDir();
}

export const cd = (path) => {
  process.chdir(path);
  base.printCurrentDir();
}

export const ls = async () => {
  try {
    const files = await fs.readdir(process.cwd());
    for (const file of files) {
    process.stdout.write(`${file}\n`);
    }
    base.printCurrentDir();
  } catch (err) {
    process.stdout.write('Operation failed\n');
    base.printCurrentDir();
  }
}