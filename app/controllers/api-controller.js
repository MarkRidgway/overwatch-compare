const fetch    = require("node-fetch");
const applog   = require('../utilities/app-logger');
const apiURL   = "https://slwp-owapi.herokuapp.com";
const profile  = require('../models/profile');
const region   = 'us'; // TODO Deal with region later
const platform = 'pc'; // TODO Deal with platform later

module.exports = {
  /**
   * Handles a request
   * @param {Object} express request object
   * @param {Object} express response object
   * @param {Function} next express middle function
   */
  test(req, res, next){
    res.json({ message: "It's in the refrigerator"});
  },
  /**
   * Handles a request
   * @param {Object} express request object
   * @param {Object} express response object
   * @param {Function} next express middle function
   */
  async getProfile(req, res, next){
    try{
      var user = req.params.user;

      var profile = await profile.getProfile(user, region, platform);
      
      res.json(profile);
    }
    catch(error){ next(error); }
  },
  /**
   * Handles a request
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
   * Handles a request
   * @param {Object} express request object
   * @param {Object} express response object
   * @param {Function} next express middle function
   */
  handle404(req, res){
    res.status(404);
    res.json({ error: '404: Apologies, Life is pain, so is death.'});
  }
}