var express = require('express');
var router  = express.Router();
var api     = require('../controllers/api-controller');

module.exports = router;

// API Routes ==================================================================
router.get('/test',   api.test);
router.get('/:user/', api.getProfile);
