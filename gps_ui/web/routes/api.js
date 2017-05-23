var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('map', { title: 'GPS Tracker - map' });
  //console.log('test');
 res.send('api called');
});

module.exports = router;
