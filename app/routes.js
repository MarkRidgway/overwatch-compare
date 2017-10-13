var express        = require('express');
var router         = express.Router();
var siteController = require('./controllers/controller.site');

// export the router
module.exports = router;

// Site Routes ======================================================
router.get('/hi', siteController.helloWorld);

// 404 Catch All
router.use(siteController.show404);