import os from 'os';
import fs from 'fs/promises';

export const getUsername = () => {
  const dummy = 'stranger';
  try {
    return process.argv[2].replace(/--username=/i, '') || dummy;
  } catch (error) {
    return dummy;
  }
}

export const enter = () => {
  process.stdout.write(`Welcome to the File Manager, ${getUsername()}!\n`);
  process.chdir(os.homedir());
  printCurrentDir();  
}

export const exit = () => {
  process.stdout.write(`\nThank you for using File Manager, ${getUsername()}!`);
  process.exit();
}

export const printCurrentDir = () => {
  process.stdout.write(`You are currently in ${process.cwd()}\n`);
}

export const printInvalid = () => {
  process.stdout.write('Invalid input\n');
  printCurrentDir();
}

export const up = () => {
  process.chdir('..');
  printCurrentDir();
}

export const cd = (path) => {
  process.chdir(path);
  printCurrentDir();
}

export const ls = async () => {
  try {
    const files = await fs.readdir(process.cwd());
    for (const file of files) {
      process.stdout.write(`${file}\n`);
    }
    printCurrentDir();
  } catch (err) {
    process.stdout.write(`${err}\n`);
    printCurrentDir();
  }
}

process.on('SIGINT', exit);

process.stdin.on('data', (chunk) => {
  const cmd = chunk.toString().trim().split(' ');  
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
      ls();
      break;
    default:
      printInvalid();
      break;
  }
});

enter();