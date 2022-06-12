import * as base from './base.js';
import fs from 'fs';
import path from 'path';
import zlib from 'zlib';

export const compress = async (pathFile, pathDest) => {
  try {
    const rs = fs.createReadStream(pathFile);
    const ws = fs.createWriteStream(path.join(pathDest, path.basename(pathFile)));
    const brotli = zlib.createBrotliCompress();
    const s = rs.pipe(brotli).pipe(ws);
    s.on('finish', () => {
      base.printCurrentDir();
    });
    rs.on('error', () => {
      process.stdout.write('Operation failed\n');
      base.printCurrentDir();
    });
    ws.on('error', () => {
      process.stdout.write('Operation failed\n');
      base.printCurrentDir();
    });
    brotli.on('error', () => {
      process.stdout.write('Operation failed\n');
      base.printCurrentDir();
    });
    s.on('error', () => {
      process.stdout.write('Operation failed\n');
      base.printCurrentDir();
    });
  } catch (err) {
    process.stdout.write('Operation failed\n');
    base.printCurrentDir();
  }
};

export const decompress = async (pathFile, pathDest) => {
  try {
    const rs = fs.createReadStream(pathFile);
    const ws = fs.createWriteStream(path.join(pathDest, path.basename(pathFile)));
    const brotli = zlib.createBrotliDecompress();
    const s = rs.pipe(brotli).pipe(ws);
    s.on('finish', () => {
      base.printCurrentDir();
    });
    rs.on('error', () => {
      process.stdout.write('Operation failed\n');
      base.printCurrentDir();
    });
    ws.on('error', () => {
      process.stdout.write('Operation failed\n');
      base.printCurrentDir();
    });
    brotli.on('error', () => {
      process.stdout.write('Operation failed\n');
      base.printCurrentDir();
    });
    s.on('error', () => {
      process.stdout.write('Operation failed\n');
      base.printCurrentDir();
    });
  } catch (err) {
    process.stdout.write('Operation failed\n');
    base.printCurrentDir();
  }
};