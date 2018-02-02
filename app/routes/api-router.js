var express = require('express');
var router  = express.Router();
var api     = require('../controllers/api-controller');

module.exports = router;

// API Routes ==================================================================
router.get('/',                api.test);
router.get('user/:user/',      api.getProfile);
router.get('user/:user/stats', api.getStats);
router.use(api.handle404);