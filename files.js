import * as base from './base.js';
import fs from 'fs';

export const cat = async (path) => {
  try {
    const rs = fs.createReadStream(path, 'utf8');
    let text = '';
    rs.on('data', (chunk) => {
      text += chunk;
    });
    rs.on('end', () => {
      process.stdout.write(`${text}\n`);
      base.printCurrentDir();
    });
    rs.on('error', () => {
      process.stdout.write('Operation failed\n');
      base.printCurrentDir();
    });
  } catch (err) {
    process.stdout.write('Operation failed\n');
    base.printCurrentDir();
  }
};