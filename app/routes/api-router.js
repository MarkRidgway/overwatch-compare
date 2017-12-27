var express = require('express');
var router  = express.Router();
var api     = require('../controllers/api-controller');

module.exports = router;

// API Routes ==================================================================
router.get('/v0/test',              api.test);
router.get('/v0/:user/solo-kills/', api.getUserKills);
