import createError from 'http-errors';
import express from 'express';
import cors from "cors";
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import helmet from 'helmet';

import indexRouter from './routes/index';
import profileRouter from './routes/profile';

var app = express();

app.use('/apidoc', express.static('../apidoc'));
app.use(helmet());
app.use(
  cors({
    origin: '*',
  })
);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// application routes
app.use('/', indexRouter);
app.use(['/profile', '/profiles'], profileRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(new createError.NotFound(`Route '${req.url}' Not Found.`));
});

// error handler
app.use(function (err, req, res, next) {
  if (createError.isHttpError(err)) {
    res.locals.message = err.message;
    res.locals.status = err.statusCode;
    if (process.env.NODE_ENV === 'development') {
      res.locals.error = err;
    }
  }
  
  if (process.env.NODE_ENV === 'production' && !res.locals.message) {
    res.locals.message = 'ApplicationError';
    res.locals.status = 500;
  }
  if (res.locals.status) {
    res.status(res.locals.status || 500);
    const errObject = { error: res.locals.error, message: res.locals.message };
    return res.json(errObject);
  }
  next(err);
});

export default app;
