var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('test', { title: 'GPS Tracker - Test Page' });
  //console.log('test');
 
});

module.exports = router;
