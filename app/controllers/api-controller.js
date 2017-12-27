const fetch = require("node-fetch");
const applog = require('../utilities/app-logger');
const apiURL = "https://slwp-owapi.herokuapp.com";
const region = 'us';

module.exports = {
  test(req, res, next){
    res.json({ message: 'oh hi mark' });
  },
  getUserKills(req, res, next){
    var user = req.params.user;
    var soloKills = 0;

    fetch(`${apiURL}/stats/pc/${region}/${user}`)
      .then(response => {
        response.json().then(json => {
          soloKills = parseSoloKills(json.stats.combat.quickplay);
          res.json({ quickplay_solo_kills: soloKills });
        });
      })
      .catch(error => {
        console.log(error);
      });
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