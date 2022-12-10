import os from 'os';

const enter = () => {
  process.stdout.write(`Welcome to the File Manager, ${getUsername()}!\n`);
  process.chdir(os.homedir());
  printCurrentDir();
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

process.on('SIGINT', exit);
process.stdin.on('data', (chunk) => {
  switch (chunk.toString().trim()) {
    case '.exit':
      exit();
      break;
    default:
      printInvalid();
      break;
  }
  printCurrentDir();
});

enter();
