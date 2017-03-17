'use strict';

const config = require('../config/environment');
const fs = require('fs');
const express = require('express');
const logger = require('./log');
const uuid = require('uuid');

module.exports = (app) => {
  // Connect to database
  app.use(
    '/api', // all route goes under api
    loggerMiddleWare, // log api calls
    createApiRouter()
  );
};

function createApiRouter() {
  const apiRouter = express.Router();
  let moduleRouter;

  // synchronous to ensure all route registration before returning the router
  fs.readdirSync(__dirname).forEach((file) => {
    if (file.indexOf('.') === -1) { // extension does not exist -> it's a folder
      moduleRouter = require(`./${file}`).router;  // eslint-disable-line global-require

      if (typeof moduleRouter === 'function') {
        apiRouter.use(`/${file}`, moduleRouter);  // register all module router under its name
      }
    }
  });

  if (config.env !== 'production') {
    apiRouter.get('/doc', (req, res) => {
      res.sendFile(`${__dirname}/doc.html`);
    });
  }

  return apiRouter;
}


function loggerMiddleWare(req, res, next) {
  const start = Date.now();
  const id = uuid.v4();
  req.log = logger;

  logger.info({
    requestId: id,
    user: req.user,
    req: breakCircular(req),
    res: breakCircular(res),
  }, 'request start');

  res.on('finish', () => {
    logger.info({
      requestId: id,
      user: req.user,
      req: breakCircular(req),
      res: breakCircular(res),
      duration: msToTime(Date.now() - start),
    }, 'request finished');
  });
  res.on('close', () => {
    logger.warn({
      requestId: id,
      user: req.user,
      req: breakCircular(req),
      res: breakCircular(res),
      duration: msToTime(Date.now() - start),
    }, 'request socket closed');
  });

  next();
}

function msToTime(duration) {
  const milliseconds = parseInt((duration % 1000) / 100, 10);
  let seconds = parseInt((duration / 1000) % 60, 10);
  let minutes = parseInt((duration / (1000 * 60)) % 60, 10);
  let hours = parseInt((duration / (1000 * 60 * 60)) % 24, 10);

  hours = (hours < 10) ? `0${hours}` : hours;
  minutes = (minutes < 10) ? `0${minutes}` : minutes;
  seconds = (seconds < 10) ? `0${seconds}` : seconds;

  return `${hours} : ${minutes} : ${seconds}.${milliseconds}`;
}

function breakCircular(obj) {
  const seen = [];
  return JSON.parse(
    JSON.stringify(obj, (key, val) => {
      if (val != null && typeof val === 'object') {
        if (seen.indexOf(val) >= 0) return;
        seen.push(val);
      }
      return val;
    })
  );
}
