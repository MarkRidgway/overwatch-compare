const path = require('path');
const env  = require('node-env-file');

// Tracks if env file is loaded
var envLoaded = false;

module.exports = { getConfigVar, getConfigObject }

/**
 * Gets an env variable from process.env
 * @param {String} variable
 * @returns {String} variable value
 */
function getConfigVar(configVar){
  loadEnvFile()

  if(process.env[configVar]){
    return process.env[configVar];
  }
  else{
    return false;
  }
}

/**
 * Gets env variables
 * @param {String[]} array of env variables to get
 * @returns {Object} key value pair of env variables
 */
function getConfigObject(configVars){
  loadEnvFile()

  var configObj = {};
  configVars.forEach( (configVar) =>{
    configObj[configVar] = getConfigVar(configVar);
  });

  return configObj;
}

/**
 * Loads the .env file in root if not already loaded
 */
function loadEnvFile(){
  if(!envLoaded){
    // Load .env file into env
    env(path.join(__dirname, '../../.env'));

    envLoaded = true;
  }

}