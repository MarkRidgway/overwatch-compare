const app        = require('express')();
const morgan     = require('morgan');
const bodyParser = require('body-parser');
const port       = process.env.PORT || 7676;
const express    = require('express');
const errors     = require('./app/middleware/middleware.errors');
const appRouter  = require('./app/routes/app-router.js');
const apiRouter  = require('./app/routes/api-router.js');
const environment = process.env.NODE_ENV;

// configure
if(environment === 'local'){
  app.use(morgan('dev'));
}
app.use(bodyParser.urlencoded({ extended: true }));

// Status
app.use(require('express-status-monitor')());

// Static Directory
app.use(express.static('app/public'));

// set routes
app.use("/api/", apiRouter);
app.use(appRouter);


// Error middleware
app.use(errors.logErrors);
app.use(errors.sendErrors);

// start tje server
app.listen(port, function(){
  console.log(`App listening on http://localhost:${port}`);
});