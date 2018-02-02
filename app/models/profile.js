const mongoose = require('mongoose');
const Schema   = mongoose.Schema;
const fetch    = require("node-fetch");
const applog   = require('../utilities/app-logger');
const apiURL   = "https://slwp-owapi.herokuapp.com";
const config   = require('../../config/config.json');
const mongocfg = config.mongo;
const statExp  = 300000;    // Stat expiration date {{ default is 5 minutes }}

mongoose.Promise = Promise;

const ProfileSchema = new Schema({
  user: String,
  region: String,
  platform: String,
  statsHistory: [{ date: Date, stats: String }]
});

const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = { getStats, getProfile };

/**
 * Gets the latest stats from a profile
 * @param {String} user
 * @param {String} region
 * @param {String} platform
 * @returns {Object} stats
 */
function getStats(user, region = 'us', platform = 'pc'){
  return new Promise( async (resolve, reject) =>{
    try{
      var profile = await getProfile(user, region, platform);

      resolve(profile.stats);
    }
    catch(error){ reject(error); }
  });
}

/**
 * Gets an updated profile model with stats
 * @param {String} user
 * @param {String} region
 * @param {String} platform
 * @returns {Object} profile model with updated stats
 */
function getProfile(user, region = 'us', platform = 'pc'){
  return new Promise( async (resolve, reject) =>{
    try{
      // Get the profile form mongo or create a profile
      await dbConnect();
      var profile = await getDbProfile(user, region, platform);

      // Check if stats exist
      if(profile.statsHistory.length >= 1){

        // Sort stats
        profile.statsHistory = profile.statsHistory.sort( (a, b) =>{
          var aDate = new Date(a.date);
          var bDate = new Date(b.date);
          return  bDate - aDate;
        });

        // Check if latest stats are expired
        latestStatDate = new Date(profile.statsHistory[0].date);
        if((new Date() - statExp) > profile.statsHistory[0].date){
          // Get updated stats from OW-API
          profile = await updateProfile(profile);
        }
      }
      else{
        // Get stats from OW-API
        profile = await updateProfile(profile);
      }

      var latestProfile = {
        user: profile.user,
        region: profile.region,
        platform: profile.platform,
        stats: JSON.parse(profile.statsHistory[0].stats)
      };

      // Return profile
      resolve(latestProfile);
    }
    catch(error){ reject(error); }
  });
}

/**
 * Updates a profile with new stats and saves them to monogdb
 * @param {Object} profile Model object
 * @returns {Object} profile model with updated stats
 */
function updateProfile(profile){
  return new Promise( async (resolve, reject) =>{
    try{
      // fetch stats
      var stats = await fetchProfile(profile.user, profile.region, profile.platform);
      var date = Date.now();

      // Add new stats to profile
      profile.statsHistory.push({ date, stats });

      // Save profile in mongo
      await saveDbProfile(profile);

      // Return profile
      resolve(profile)
    }
    catch(error){ reject(error); }
  });
}

/**
 * Fetches stats from the OW-API
 * @param {String} user
 * @param {String} region
 * @param {String} platform
 * @returns {String} stats string convereted from JSON
 */
function fetchProfile(user, region, platform){
  return new Promise( (resolve, reject) =>{
    fetch(`${apiURL}/stats/${platform}/${region}/${user}`)
      .then(response => {
        response.json().then(stats => {
          resolve(JSON.stringify(stats));
        });
      })
      .catch(error => reject(error) );
  });
}

/**
 * Saves a profile to mongodb
 * @param {Object} profile Model object
 */
function saveDbProfile(profile){
  return new Promise( (resolve, reject) =>{
    profile.save()
    .then( () => resolve() )
    .catch( (error) => reject(error) );
  });
}

/**
 * Gets a profile from mongodb 
 * @param {String} user
 * @param {String} region
 * @param {String} platform
 * @returns {Object} profile model from mongodb
 */
function getDbProfile(user, region = 'us', platform = 'pc'){
  return new Promise( (resolve, reject) =>{
    dbConnect();
    
    Profile.findOne({ user, region, platform })
    .exec(function (error, profile) {
      if (error) {
        reject(error);
      }
      if(profile == null){
        var newProfile = new Profile();
        newProfile.user = user;
        newProfile.region = region;
        newProfile.platform = platform;
        newProfile.statsHistory = [];
        resolve(newProfile);
      }
      else{
        resolve(profile);
      }
    });
  });
}

/**
 * Connects to mongodb if not already connected
 */
function dbConnect(){
  return new Promise( (resolve, reject) =>{
    if(mongoose.connection.readyState != 1){
      // connect to our database

      // TODO Improve db connection
      // mongoose.connect(`mongodb://${mongo.user}:${mongo.pass}@ds155631.mlab.com:55631/bearjs`);

      // TODO better logging
      mongoose.connect(`mongodb://${mongocfg.hostname}/${mongocfg.database}`)
      .then( () => {
        resolve();
      })
      .catch( (error) => {
        reject(error);
      });
    }
    else{
      resolve();
    }
  });
}