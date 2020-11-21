//@ts-nocheck
import chalk from 'chalk';
let logger;
(() => {
  logger = {
    log: (message, ...rest) => {
      console.log(chalk.cyanBright(message, ...rest));
    },
    info: (message, ...rest) => {
      console.log(chalk.greenBright(message, ...rest));
    },
    warn: (message, ...rest) => {
      console.log(chalk.yellowBright(message, ...rest));
    },
    error: (message, ...rest) => {
      console.log(chalk.redBright(message, ...rest));
    }
  };
})();

export default logger;
