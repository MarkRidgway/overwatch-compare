const applog       = require('../utilities/app-logger');
const compare      = require('../utilities/compare');
const profile      = require('../models/profile');
const region       = 'us'; // TODO Deal with region later
const platform     = 'pc'; // TODO Deal with platform later
const Q            = require('q');

module.exports = {
  /**
   * Handles root request to easily test if API is live
   * @param {Object} express request object
   * @param {Object} express response object
   * @param {Function} next express middle function
   */
  test(req, res, next){
    res.json({ message: "It's in the refrigerator"});
  },
  /**
   * Handles a request for a profile
   * @param {Object} express request object
   * @param {Object} express response object
   * @param {Function} next express middle function
   */
  async getProfile(req, res, next){
    try{
      var user = req.params.user;

      var userProfile = await profile.getProfile(user, region, platform);
      
      res.json(userProfile);
    }
    catch(error){ next(error); }
  },
  /**
   * Handles a request for stats
   * @param {Object} express request object
   * @param {Object} express response object
   * @param {Function} next express middle function
   */
  async getStats(req, res, next){
    try{
      var user = req.params.user;

      var stats = await profile.getStats(user, region, platform);
      
      res.json(stats);
    }
    catch(error){ next(error); }
  },
  /**
   * Handles a basic compare request
   * @param {Object} express request object
   * @param {Object} express response object
   * @param {Function} next express middle function
   */
  async compareBasic(req, res, next){
    try{
      // Validate request body has exactly 2 users
      if(req.body.users.length == 2){
        var users = [];
        var profiles = [];
        
        // TODO move to profiles module
        // Get both users
        var results = req.body.users.map( (user) => {
          return profile.getStats(user, region, platform);
        });

        Q.allSettled(results)
        .then( (results) =>{
          results.forEach(function (result){
            if (result.state === "fulfilled") {
              profiles.push(result.value);
            } else {
              next(result.reason);
            }
          });

          var comparisons = compare.basic(profiles);
          res.json(comparisons);
        })
        .catch( (error) => next(error) );
      }
      else{
        req.status = 400;
        next(new Error(''))
      }
      
      // res.json(req.body.users);
    }
    catch(error){ next(error); }
  },
  /**
   * Handles all other requests
   * @param {Object} express request object
   * @param {Object} express response object
   * @param {Function} next express middle function
   */
  handle404(req, res){
    res.status(404);
    res.json({ error: '404: Life is pain, so is death.'});
  }
}