import fs from 'fs';
import crypto from 'crypto';
import * as base from './base.js';
import * as files from './files.js';

export const getHash = (path) => {
  try {
    const rs = fs.createReadStream(path, {encoding: 'utf-8'});
    let text = '';
    rs.on('data', (chunk) => {
      text += chunk;
    });
    rs.on('end', () => {
      const hash = crypto.createHash('sha256');
      hash.update(text);
      process.stdout.write(`${hash.digest('hex')}${base.EOL}`);
    });
    rs.on('error', files.streamError);
  } catch (error) {
    base.printError();
  }
};
