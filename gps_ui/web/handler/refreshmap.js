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
/*todo:database 연결 부분 재확인*/
var refreshmap = function (params, callback) {
    var error, result;

    console.log('JSON-RPC refreshmap 호출됨.');
    console.dir(params);
    //console.log('serverside params.id : '+ params.id);

    console.log('mysql 연결 시도');
    pool.getConnection(function (err, connection) {
        var sqlStr = "select * from gps where useridx='1' order by timestamp desc limit 1";
        connection.query(sqlStr, function (err, rows) {
            if (err) {
                error = {
                    code: -1234,
                    message: "database connection error"
                };
                console.log('database 질의 오류');
                console.log(err);
            } else {
                console.log('[data 조회 완료]');
                console.log(rows);
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
};


module.exports = refreshmap;
