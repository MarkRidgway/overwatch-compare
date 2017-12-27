var express = require('express');
var router  = express.Router();
var site    = require('../controllers/site-controller');

module.exports = router;

// Site Routes =================================================================
router.get('/hi', site.ohhimark);

// 404 Catch All
router.use(site.show404);