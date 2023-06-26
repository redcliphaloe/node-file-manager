import fs, {promises as fsp} from 'fs';
import path from 'path';
import * as base from './base.js';

export const streamError = (error) => {
  base.printError(error);
  base.printCurrentDir();
};

export const cat = (path) => {
  try {
    const rs = fs.createReadStream(path, {encoding: 'utf-8'});
    rs.on('data', (chunk) => {
      process.stdout.write(chunk);
    });
    rs.on('end', () => {
      process.stdout.write(`${base.EOL}`);
      base.printCurrentDir();
    });
    rs.on('error', streamError);
  } catch (error) {
    streamError(error);
  }
};

export const add = (name) => {
  try {
    const ws = fs.createWriteStream(path.join(process.cwd(), name));
    ws.end();
    ws.on('finish', () => {
      process.stdout.write(`The file has been created${base.EOL}`);
      base.printCurrentDir();
    });
    ws.on('error', streamError);
  } catch (error) {
    streamError(error);
  }
};

export const rn = async (filePath, newName) => {
  try {
    await fsp.rename(filePath, path.join(path.dirname(filePath), newName));
    process.stdout.write(`The file has been renamed${base.EOL}`);
  } catch (error) {
    base.printError(error);
  }
};

export const cp = (filePath, newDir) => {
  try {
    const rs = fs.createReadStream(filePath);
    const ws = fs.createWriteStream(path.join(newDir, path.basename(filePath)));
    rs.on('data', (chunk) => {
      ws.write(chunk);
    });
    rs.on('end', () => {
      ws.end();
      ws.on('finish', () => {
        process.stdout.write(`The file has been copied${base.EOL}`);
        base.printCurrentDir();
      });
      ws.on('error', streamError);
    });
    rs.on('error', streamError);
  } catch (error) {
    streamError(error);
  }
};

export const mv = (filePath, newDir) => {
  try {
    const rs = fs.createReadStream(filePath);
    const ws = fs.createWriteStream(path.join(newDir, path.basename(filePath)));
    rs.on('data', (chunk) => {
      ws.write(chunk);
    });
    rs.on('end', () => {
      ws.end();
      ws.on('finish', async () => {
        await fsp.unlink(filePath);
        process.stdout.write(`The file has been moved${base.EOL}`);
        base.printCurrentDir();
      });
      ws.on('error', streamError);
    });
    rs.on('error', streamError);
  } catch (error) {
    streamError(error);
  }
};

export const rm = async (path) => {
  try {
    await fsp.unlink(path);
    process.stdout.write(`The file has been deleted${base.EOL}`);
  } catch (error) {
    base.printError(error);
  }
};
