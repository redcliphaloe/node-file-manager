import fsp from 'fs/promises';
import * as base from './base.js';

export const up = () => {
  try {
    process.chdir('..');
  } catch (error) {
    base.printError(error);
  }
};

export const cd = (path) => {
  try {
    process.chdir(path);
  } catch (error) {
    base.printError(error);
  }
};

export const parseCmdToArr = (str) => {
  const space = ' ';
  const doubleQuote = '\"';
  let arr = [];
  let tmpStr = str.trim();
  // get command
  const indexOfFirstSpace = tmpStr.indexOf(space);
  if (indexOfFirstSpace !== -1) {
    arr.push(tmpStr.slice(0, indexOfFirstSpace));
    tmpStr = tmpStr.slice(indexOfFirstSpace + 1);
  } else {
    return [tmpStr];
  }
  // get parametrs
  if (tmpStr.includes(doubleQuote)) {
    arr = [...arr, ...tmpStr.split(doubleQuote)];
    arr = arr.map(v => v.trim());
  } else {
    arr = [...arr, ...tmpStr.split(space)];
  }
  arr = arr.filter(v => v !== '');
  return arr;
};

export const ls = async (path) => {
  try {
    let dirs = [];
    let files = [];
    let dirPath = process.cwd();
    if (path) {
      dirPath = path;
    }
    const items = await fsp.readdir(dirPath, {withFileTypes: true});
    items.forEach(item => {
      if (item.isFile()) {
        files.push({Name: item.name, Type: 'file'});
      } else if (item.isDirectory()) {
        dirs.push({Name: item.name, Type: 'directory'});
      }
    });
    dirs = dirs.sort((a, b) => a.Name.localeCompare(b.Name, 'en', {numeric: true}));
    files = files.sort((a, b) => a.Name.localeCompare(b.Name, 'en', {numeric: true}));
    console.table(dirs.concat(files));
  } catch (error) {
    base.printError(error);
  }
};
