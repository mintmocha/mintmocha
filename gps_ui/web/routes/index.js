var express = require('express');
var router = express.Router();

/*note:mysql 설정*/
/*
var db_con = require('../database/db_con');
var db = db_con.init();
db.test_open(db_con);


*/
/*note:mysql 설정*/
var mysql = require('mysql');
var db      =    mysql.createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'root',
    password : '1234',
    database : 'node',
    debug    :  false
});


/* GET home page. */
router.get('/', function(req, res, next) {
    /*note:DB 조회*/
    db.getConnection(function(err, connection){
        var sqlForGPS = "select * from gps where useridx='1' order by timestamp desc limit 1";
        db.query(sqlForGPS, function (err, rows){
           if(err) {
               console.log('database 질의 오류');
           }
            //console.log('rows : '+ JSON.stringify(rows));
           if(connection){
               connection.release();
               console.log('database connection release.');
           }
            
            res.render('index', { title: 'GPS Tracker - home', data:rows});
        });
    });
    
    
});

module.exports = router;
