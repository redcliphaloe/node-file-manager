import * as base from './base.js';
import fs from 'fs';
import path from 'path';

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
}

export const rm = async (path) => {
  try {
    await fs.promises.unlink(path);
    base.printCurrentDir();
  } catch (err) {
    process.stdout.write('Operation failed\n');
    base.printCurrentDir();
  }
}

export const add = async (name) => {
  try {
    fs.createWriteStream(path.join(process.cwd(), name), 'utf8');
    base.printCurrentDir();
  } catch (err) {
    process.stdout.write('Operation failed\n');
    base.printCurrentDir();
  }
}

export const rn = async (filePath, newName) => {
  try {
    await fs.promises.rename(filePath, path.join(path.dirname(filePath), newName));
    base.printCurrentDir();
  } catch (err) {
    process.stdout.write('Operation failed\n');
    base.printCurrentDir();
  }
}

export const cp = async (filePath, newDir) => {
  try {
    await fs.promises.cp(filePath, path.join(newDir, path.basename(filePath)));
    base.printCurrentDir();
  } catch (err) {
    process.stdout.write('Operation failed\n');
    base.printCurrentDir();
  }
}

export const mv = async (filePath, newDir) => {
  try {
    await fs.promises.cp(filePath, path.join(newDir, path.basename(filePath)));
    await fs.promises.unlink(filePath);
    base.printCurrentDir();
  } catch (err) {
    process.stdout.write('Operation failed\n');
    base.printCurrentDir();
  }
}