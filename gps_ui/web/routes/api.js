var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('map', { title: 'GPS Tracker - map' });
  //console.log('test');
 res.send('api called');
});

/*note:GPS 추가 API*/
router.route('/push').post(function (req, res, next){
    //consloe.log('api/push 호출됨');
    res.send('정상 등록');
    
    
});
module.exports = router;
