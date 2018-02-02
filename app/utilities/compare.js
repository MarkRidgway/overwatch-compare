const applog = require('../utilities/app-logger');

module.exports = { basic }

function basic(profiles){
  var comparisons = [];

  // Compare healing

  // Compare damage

  // Compare most top 3 most played
  comparisons.push(compareHelpers.compareTopHeroes(profiles));

  return comparisons;
}

function multiple(){}

var compareHelpers = {
  compareHealing(profiles){},
  compareDamage(profiles){},
  compareTopHeroes(profiles){
    // TODO compare top 3 in context of hero class

    var comparison = {}

    profiles.forEach( (profile) =>{
      applog.obj({
        msg: "profile",
        obj: profile
      });

      let user = profile.username;
      let topHeroes = profile.stats.top_heroes.quickplay;
      
      // Create comparison object
      comparison[user] = {
        meta: {
          type: "total",
          hours: 0
        },
        heroes: {}
      };

      // Add top heroes 3 times to comparison object
      for(let i = 0; i < 3; i++){
        let hero = topHeroes[i].hero;
        let hours = parseInt(topHeroes[i].played); 
        
        comparison[user].meta.hours += hours;
        comparison[user].heroes[hero] = hours;
      }
    });

    return { "top_heroes": comparison };
  }
};