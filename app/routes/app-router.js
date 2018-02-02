var express = require('express');
var router  = express.Router();
var app     = require('../controllers/app-controller');

module.exports = router;

// Site Routes =================================================================

// 404 Catch All
router.use(app.githubRedirect);