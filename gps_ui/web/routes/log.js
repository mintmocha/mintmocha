var express = require('express');
var router = express.Router();

/*note:mysql 설정*/
var mysql = require('mysql');
var pool      =    mysql.createPool({
    connectionLimit : 100, //important
    host     : 'localhost',
    user     : 'root',
    password : '1234',
    database : 'node',
    debug    :  false
});


/* GET home page. */
router.get('/', function(req, res, next) {
    pool.getConnection(function(err, connection){
        var queryString = "select * from log where useridx='1' order by timestamp desc limit 20";
        connection.query(queryString, function (err, rows){
           if(err) {
               console.log('database 질의 오류');
           }
            console.log('rows : '+ JSON.stringify(rows));
           if(connection){
               connection.release();
               console.log('database connection release.');
           }

            res.render('log', { title: 'GPS Tracker - log', data:rows});
        });
    });
});

module.exports = router;
