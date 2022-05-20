import chalk from 'chalk';

const logger = {
  info(...args) {
    console.log(chalk.green.bold('INFO:'), ...args);
  },
  err(...args) {
    console.log(chalk.red.bold('ERR:'), ...args);
  },
};

export default logger