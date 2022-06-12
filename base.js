import os from 'os';

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