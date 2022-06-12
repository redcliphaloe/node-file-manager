import * as base from './base.js';
import fs from 'fs/promises';
import crypto from 'crypto';

export const getHash = async (path) => {
  try {
    const text = await fs.readFile(path, 'utf8');
    const hash = crypto.createHash('sha256');
    hash.update(text);
    process.stdout.write(`${hash.digest('hex')}\n`);
    base.printCurrentDir();
  } catch (err) {
    process.stdout.write('Operation failed\n');
    base.printCurrentDir();
  }
};