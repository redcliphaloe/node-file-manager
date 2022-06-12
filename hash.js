import * as base from './base.js';
import fs from 'fs';
import crypto from 'crypto';

export const getHash = async (path) => {
  try {
    const rs = fs.createReadStream(path, 'utf8');
    let text = '';
    rs.on('data', (chunk) => {
      text += chunk;
    });
    rs.on('end', () => {
      const hash = crypto.createHash('sha256');
      hash.update(text);
      process.stdout.write(`${hash.digest('hex')}\n`);
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
}