var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var db = require('./models/db');
var index = require('./routes/index');
var topic = require('./routes/topic');
var user = require('./routes/user');
var login = require('./routes/login');
var logout = require('./routes/logout');
var register = require('./routes/register');
var publish = require('./routes/publish');
var comment = require('./routes/comment');
var node = require('./routes/node');
var sign = require('./routes/sign');
var message = require('./routes/message');
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


app.all('*',function (req, res, next) {
  if (req.cookies.user_id === undefined) {
    res.cookie('username', 'undefined', { maxAge: 9000000, httpOnly: true });
    res.cookie('user_id', 'undefined', { maxAge: 9000000, httpOnly: true });
    res.cookie('money', 'undefined', { maxAge: 9000000, httpOnly: true });
  };
  db.table('node').select()
  .then(function (data) {
    app.locals.nodes = data;
    return db.table('topic').join('user on topic.user_id = user.user_id').select();
  }).then(function (data) {
    app.locals.topics = data;
    return db.table('user').count('user_id');
  }).then(function (data) {
    app.locals.userCount = data;
    return db.table('topic').count('topic_id');
  }).then(function (data) {
    app.locals.topicsCount = data;
    return db.table('comment').count('comment_id');
  }).then(function (data) {
    app.locals.commentCount = data;
    return db.table('user').where({
      user_id: req.cookies.user_id
    }).select();
  }).then(function (data) {
      app.locals.user = data.length === 0 ? null : data[0];
      return db.table('message').where({
        receiver_id: req.cookies.user_id
      }).select()
  }).then(function (data) {
      app.locals.message = data;
      next();
  }).catch(function (error) {
      console.log(error);
  });
});

app.use('/', index);
app.use('/topic', topic);
app.use('/publish', publish);
app.use('/user', user);
app.use('/login', login);
app.use('/comment', comment);
app.use('/message', message);
app.use('/register', register);
app.use('/node', node);
app.use('/sign', sign);
app.use('/logout', logout);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
