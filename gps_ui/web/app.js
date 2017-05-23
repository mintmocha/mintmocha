var express      = require('express');
var path         = require('path');
var favicon      = require('serve-favicon');
var logger       = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');

// note:routes
var index = require('./routes/index');
var users = require('./routes/users');
var map   = require('./routes/map');
var api   = require('./routes/api');
var test  = require('./routes/test');
var jayson = require('jayson');
var app   = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
//note:route사용 설정
app.use('/', index);
app.use('/users', users);
app.use('/map', map);
app.use('/api', api);
app.use('/test', test);

/*note:mysql 설정*/
var mysql = require('mysql');
var pool = mysql.createPool({
    connectionLimit:10,
    user:'root',
    password:'qwer1234!',
    database:'node',
    debug:false,
    port:3388
});

/*note:GPS DB 추가*/
/*var addGps = function( _lat, _lng, _user, callback){
    console.log('Add Gps function called');
    //connection pool 에서 연결 객체 로드
    pool.getConnection(function(err, conn){
        if(err){
            if(conn){
                conn.release();
            }
            callback(err, null);
            retrun;
        }
        console.log('Database connection thread id : '+ conn.threadId);

        var exec = conn.query('insert into gps set ?', data, function(err, result){
            conn.release();
            console.log('실행 SQL : '+exec.sql);

            if(err){
                console.log('sql 실행시 오류 발생');
                console.dir(err);

                callback(err, null);

                return;
            }
            callback(null, result);
        });
    })

}*/
/*note:catch 404 and forward to error handler*/
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

/*note:error handler*/
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


module.exports = app;
