var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

let index = require('./routes/index');
let about = require('./routes/about');
let blog = require('./routes/blog');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//
// МАРШРУТИЗАЦИЯ ЗАПРОСОВ
//

app.use('/', index);
app.use("/about", about);
app.use("/blog", blog);

//
// 404
//

app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

//
// ОБРАБОТКА ОШИБОК
///

app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

// setInterval(()=> {
//   var mem = process.memoryUsage();
//   console.log(`rss: ${(mem.rss/1024)/1024} M; heapT: ${(mem.heapTotal/1024)/1024}M; heapU: ${(mem.heapUsed/1024)/1024}M`);
// }, 2000);

module.exports = app;
