const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const session = require('express-session')
const logger = require('morgan');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const testDbRouter = require('./routes/test_output_db');
const test1Router = require('./routes/test1');
const loginRouter = require('./routes/login');
const signupRouter = require('./routes/signup');
const deleteRouter = require('./routes/delete');
const doneRouter = require('./routes/done');
const apiRouter = require('./api/sampleapi');
const logoutRouter = require('./routes/logout');

const app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// セッション
app.use(session({
  secret: "testing",
  resave: false,
  saveUninitialized: true,
}))

//auth
require('./auth')(app);

//router
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/testdb', testDbRouter);
app.use('/test1', test1Router);
app.use('/login', loginRouter);
app.use('/signup', signupRouter);
app.use('/delete', deleteRouter);
app.use('/api', apiRouter);
app.use('/done', doneRouter);
app.use('/logout', logoutRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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
