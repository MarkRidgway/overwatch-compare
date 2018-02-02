const util = require('util');
const chalk = require('chalk');
const warn  = chalk.keyword('orange');
const prefix = 'OVERWATCH-TEST';
const configLoader = require('../utilities/config-loader');
const debug        = configLoader.getConfigVar('DEBUG');

module.exports = {
  /**
   * Logs a specially formatted message to the console
   * @param {String} a message to log to the console
   */
  appstart(message){
    console.log(chalk.black.bgCyan(`${prefix}: ${message}`));
  },
  /**
   * Logs a message to the console if in DEBUG mode
   * @param {String} message to be logged
   */
  log(message){
    if(debug){
      console.log(chalk.cyan(`${prefix}: ${message}`));
    }
  },
  /**
   * Logs a message to the console with special formatting
   * @param {String} message to be logged
   */
  highlight(message){
    console.log(chalk.black.bgGreen(`${prefix}: ${message}`));
  },
  /**
   * Logs an object to the console if in DEBUG mode
   * @param {object} data - any object but accepts msg (String) and obj (object)
   *                 properties for special formatting.
   */
  obj(data){
    if(debug){
      if(data.msg && data.obj){
        console.log(chalk.underline.black.bgBlue(`${prefix}- ${data.msg}:`));
        console.log(chalk.bgBlue(util.inspect(data.obj, {showHidden: false, depth: null})));
      }
      else{
        console.log(chalk.underline.black.bgBlue(`${prefix}- Object:`));
        console.log(chalk.bgBlue(util.inspect(data, {showHidden: false, depth: null})));
      }
    }
  },
  /**
   * Logs a warning to the console
   * @param {String} message to be logged
   */
  warn(message){
    console.log(warn(`${prefix} Warning: ${message}`));
  },
  /**
   * Logs an error to the console
   * @param {object} error object
   */
  error(error){
    console.log(chalk.black.bgRed(`${prefix} ${error.message}:`));
    console.log(chalk.red.bgBlack(util.inspect(error, {showHidden: false, depth: null})));
  }
}