const app          = require('express')();
const bodyParser   = require('body-parser');
const port         = process.env.PORT || 7676;
const express      = require('express');
const errors       = require('./app/middleware/middleware.errors');
const appRouter    = require('./app/routes/app-router.js');
const apiRouter    = require('./app/routes/api-router.js');
const applog       = require('./app/utilities/app-logger');
const configLoader = require('./app/utilities/config-loader');
const config       = configLoader.getConfigObject(['NODE_ENV']);

(function(){
  // configure
  if(config.NODE_ENV != 'production'){
    console.log('using morgan');
    const morgan = require('morgan');
    app.use('/api/', morgan('dev'));
  }
})();

// Body parser
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())

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
  applog.appstart(`App listening at http://localhost:${port} on ${config.NODE_ENV}`);
});