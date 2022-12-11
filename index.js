import os from 'os';
import fsp from 'fs/promises';

const OPERATION_ERROR_TEXT = 'Operation failed';

const enter = () => {
  process.stdout.write(`Welcome to the File Manager, ${getUsername()}!\n`);
  try {
    process.chdir(os.homedir());
  } catch (error) {
    printError();
  } finally {
    printCurrentDir();
  }
};

const getUsername = () => {
  const defaultUsername = 'stranger';
  try {
    return process.argv[2].replace(/--username=/i, '') || defaultUsername;
  } catch (error) {
    return defaultUsername;
  }
};

const exit = () => {
  process.stdout.write(`\nThank you for using File Manager, ${getUsername()}, goodbye!`);
  process.exit();
};

const printCurrentDir = () => {
  process.stdout.write(`You are currently in ${process.cwd()}\n`);
};

const printInvalid = () => {
  process.stdout.write('Invalid input\n');
};

const printError = () => {
  process.stdout.write(`${OPERATION_ERROR_TEXT}\n`);
};

const up = () => {
  try {
    process.chdir('..');
  } catch (error) {
    printError();
  }
};

const cd = (path) => {
  try {
    process.chdir(path);
  } catch (error) {
    printError();
  }
};

const parseCmdToArr = (str) => {
  const doubleQuote = '\"';
  let arr = [];
  if (str.includes(doubleQuote)) {
    arr = str.trim().split('\"');
    arr = arr.map(v => v.trim());
  } else {
    arr = str.trim().split(' ');
  }
  arr = arr.filter(v => v !== '');
  return arr;
};

const ls = async (path) => {
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
      } else {
        dirs.push({'Name': item.name, 'Type': 'directory'});
      }
    });
    console.table(dirs.concat(files));
  } catch (err) {
    printError();
  }
};

process.on('SIGINT', exit);
process.stdin.on('data', async (chunk) => {
  const cmd = parseCmdToArr(chunk.toString());
  switch (cmd[0]) {
    case '.exit':
      exit();
      break;
    case 'up':
      up();
      break;
    case 'cd':
      cd(cmd[1]);
      break;
    case 'ls':
      await ls(cmd[1]);
      break;
    default:
      printInvalid();
      break;
  }
  printCurrentDir();
});

enter();
