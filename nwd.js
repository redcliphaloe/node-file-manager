import fsp from 'fs/promises';
import * as base from './base.js';

export const up = () => {
  try {
    process.chdir('..');
  } catch (error) {
    base.printError();
  }
};

export const cd = (path) => {
  try {
    process.chdir(path);
  } catch (error) {
    base.printError();
  }
};

export const parseCmdToArr = (str) => {
  const doubleQuote = '\"';
  let arr = [];
  if (str.includes(doubleQuote)) {
    arr = str.trim().split(doubleQuote);
    arr = arr.map(v => v.trim());
  } else {
    arr = str.trim().split(' ');
  }
  arr = arr.filter(v => v !== '');
  return arr;
};

export const ls = async (path) => {
  try {
    const dirs = [];
    const files = [];
    let dirPath = process.cwd();
    if (path) {
      dirPath = path;
    }
    const items = await fsp.readdir(dirPath, {withFileTypes: true});
    items.forEach(item => {
      if (item.isFile()) {
        files.push({'Name': item.name, 'Type': 'file'});
      } else if (item.isDirectory()) {
        dirs.push({'Name': item.name, 'Type': 'directory'});
      }
    });
    console.table(dirs.concat(files));
  } catch (err) {
    base.printError();
  }
};
