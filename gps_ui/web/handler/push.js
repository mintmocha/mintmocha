/*note:mysql 설정*/
var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit: 100, //important
    host: 'localhost',
    user: 'root',
    password: '1234',
    database: 'node',
    debug: false
});

/*note:gps 등록*/
var push = function(params, callback) {
	console.log('JSON-RPC push 호출됨.');
	console.dir(params);

    console.log('get mysql connection');
    pool.getConnection(function(err, connection){
        var queryStr = 'insert into node.gps(`useridx`,`lat`, `lng`, `alt`, `status_device`, `status_gps`, `gps_mode`) values (?,?,?,?,?,?,?)';
        var error, result;
        connection.query(queryStr, params, function(err, rows){
           if(err) {
               error = {
                    code: -1234,
                    message: "database connection error"
                };
               console.log('database 질의 오류');
               console.log(err);
           } else {
                console.log('[GPS 추가 완료]');
                //console.log(rows);
                //result = JSON.stringify(rows);
                result = rows;
                console.log('result : ' + result);
            }

            //DB Connection 종료
            if (connection) {
                connection.release();
                console.log('database connection release.');
            }

            //결과 전송
            callback(error, result);
        });
    });



	//console.log(params);
	//callback(null, "good");
};


module.exports = push;
