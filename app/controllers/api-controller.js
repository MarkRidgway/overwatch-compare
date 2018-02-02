const fetch    = require("node-fetch");
const applog   = require('../utilities/app-logger');
const apiURL   = "https://slwp-owapi.herokuapp.com";
const profile  = require('../models/profile');
const region   = 'us'; // TODO Deal with region later
const platform = 'pc'; // TODO Deal with platform later

module.exports = {
  test(req, res, next){
    res.json({ message: 'oh hi mark' });
  },
  async getProfile(req, res, next){
    try{
      var user = req.params.user;

      var profile = await profile.getProfile(user, region, platform);
      
      res.json(profile);
    }
    catch(error){ next(error); }
  },
  async getStats(req, res, next){
    try{
      var user = req.params.user;

      var stats = await profile.getStats(user, region, platform);
      
      res.json(profile);
    }
    catch(error){ next(error); }
  }
}