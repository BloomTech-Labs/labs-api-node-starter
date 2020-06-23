var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var helmet = require('helmet');
const dotenv = require('dotenv');
const config_result = dotenv.config();
if(config_result.error) { throw config_result.error }

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

app.use(helmet());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// application routes
app.use('/', indexRouter);
app.use('/users', usersRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).json( {error: "Route '"+req.url+"' Not Found."} );
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  if(req.app.get('env') === 'development') {
    console.log(err);
  }
  
  // render the error page
  res.status(err.status || 500);
  res.json({error: res.locals.error});
});

module.exports = app;
