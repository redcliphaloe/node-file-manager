import fs from 'fs';
import path from 'path';
import zlib from 'zlib';
import {pipeline} from 'stream/promises';
import * as base from './base.js';

const DOT_BR = '.br';

export const compress = async (pathFile, pathDest) => {
  try {
    const rs = fs.createReadStream(pathFile, {encoding: 'utf-8'});
    const brotli = zlib.createBrotliCompress();
    if (!pathDest) {
      pathDest = path.dirname(pathFile);
    }
    const ws = fs.createWriteStream(path.join(pathDest, `${path.basename(pathFile)}${DOT_BR}`));
    await pipeline(rs, brotli, ws);
    process.stdout.write(`The file has been compressed${base.EOL}`);
  } catch (error) {
    base.printError(error);
  }
};

export const decompress = async (pathFile, pathDest) => {
  try {
    const rs = fs.createReadStream(pathFile);
    const brotli = zlib.createBrotliDecompress();
    if (!pathDest) {
      pathDest = path.dirname(pathFile);
    }
    let newFileName = path.basename(pathFile);
    if (newFileName.endsWith(DOT_BR)) {
      newFileName = newFileName.slice(0, -DOT_BR.length);
    }
    const ws = fs.createWriteStream(path.join(pathDest, newFileName));
    await pipeline(rs, brotli, ws);
    process.stdout.write(`The file has been decompressed${base.EOL}`);
  } catch (error) {
    base.printError(error);
  }
};
