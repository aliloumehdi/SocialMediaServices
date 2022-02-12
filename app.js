var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var bodyParser = require('body-parser')
var cookieParser = require('cookie-parser')

var indexRouter = require('./routes/index');
var userRouter = require('./routes/user.route');
var authRouter = require('./routes/auth.route');
const {checkUser,requireAuth}  =require("./middleware/auth.middleware")
  require("./config/db")
var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// JWT

app.get("*",checkUser) 
app.get("/jwtid",requireAuth ,(req,res)=>{
  res.status(200).send(res.locals.user._id)
})


// ROUTES
app.use('/', indexRouter);
app.use('/api/v1/user', userRouter);
app.use('/api/v1/auth', authRouter);


// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser());
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
