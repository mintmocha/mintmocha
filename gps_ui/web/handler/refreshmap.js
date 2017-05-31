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

/*note:gps 등록*/
/*todo:database 연결 부분 재확인*/
var refreshmap = function(params, callback) {
	console.log('JSON-RPC refreshmap 호출됨.');
	console.dir(params);
    //console.log('serverside params.id : '+ params.id);

    console.log('mysql 연결 시도');
    pool.getConnection(function(err, connection){
       var sqlStr = "select * from gps where userid='1' order by timestamp desc limit 1" ;
          connection.query(sqlStr, function (err, rows){
           if(err) {
               console.log('database 질의 오류');
           }
            //console.log('rows : '+ JSON.stringify(rows));
           if(connection){
               connection.release();
               console.log('database connection release.');
           }

           // res.render('index', { title: 'GPS Tracker - home', data:rows});
        });
    });

};



module.exports = refreshmap;
