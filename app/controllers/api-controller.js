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
  getProfile(req, res, next){
    var user = req.params.user;

    profile.getProfile(user, region, platform)
    .then( (profile) =>{
      res.json(profile);
    })
    .catch( (error) => {
      res.json({
        message: 'there was an error',
        error: error
      });
    })


  }
}

function parseSoloKills(_combatData){
  var soloKills = 0;

  _combatData.forEach( (data) =>{
    if(data.title == 'Solo Kills'){
      applog.obj({
        msg: 'combat_data',
        obj: data
      });

      soloKills = data.value;
    }
  });

  return soloKills;
}