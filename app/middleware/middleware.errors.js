const applog = require('../utilities/app-logger');

module.exports = {
  logErrors(error, req, res, next){
    console.log(error.message);
    console.log(error.stack);
    next(error);
  },
  sendErrors(error, req, res, next){
    if(req.status){
      res.status(req.status);
    }
    else{
      res.status(500);
    }
    res.json({
      error: error.message,
      stack: error.stack
    });
  }
}