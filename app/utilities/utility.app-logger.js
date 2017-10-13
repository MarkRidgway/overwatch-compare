const chalk   = require('chalk');
const error   = chalk.bold.red;
const warn = chalk.keyword('orange');

const prefix = 'APP: ';

module.exports = {
  log(message){
    console.log(chalk.blue(`${prefix}: ${message}`));
  },
  warn(warning){
    console.log(warn(`${prefix}: ${message}`));
  },
  error(error){
    console.log(error(`${prefix}: ${message}`));
  }
}