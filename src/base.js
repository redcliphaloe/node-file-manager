import os from 'os';

export const EOL = os.EOL;
const OPERATION_ERROR_TEXT = 'Operation failed';

export const enter = () => {
  process.stdout.write(`Welcome to the File Manager, ${getUsername()}!${EOL}`);
  try {
    process.chdir(os.homedir());
  } catch (error) {
    printError(error);
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

export const exit = () => {
  process.stdout.write(`Thank you for using File Manager, ${getUsername()}, goodbye!${EOL}`);
  process.exit();
};

export const printCurrentDir = () => {
  process.stdout.write(`You are currently in ${process.cwd()}${EOL}`);
};

export const printInvalid = () => {
  process.stdout.write(`Invalid input${EOL}`);
};

export const printError = (error) => {
  process.stdout.write(`${error}${EOL}`);
  process.stdout.write(`${OPERATION_ERROR_TEXT}${EOL}`);
};
