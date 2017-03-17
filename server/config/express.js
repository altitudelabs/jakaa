/**
* Express configuration
*/

'use strict';
const express = require('express');
const favicon = require('serve-favicon');
const compression = require('compression');
const path = require('path');
const config = require('./environment');
const bodyParser = require('body-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const mongoose = require('mongoose');
const expressValidator = require('express-validator');
const boolParser = require('express-query-boolean');

module.exports = (app) => {
  // view engine Setup
  app.set('views', `${config.root}/server/views`);
  app.set('view engine', 'pug');

  app.use(compression());

  app.use(session({
    secret: config.secrets.session,
    store: new MongoStore({
      mongooseConnection: mongoose.connection,
    }),
    resave: false,
    saveUninitialized: false,
  }));

  app.use(bodyParser.json({ limit: config.maxTotalUploadSize }));
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(boolParser());
  app.use(expressValidator({
    errorFormatter: (param, msg, value) => {
      return {
        param,
        message: msg,
        value,
      };
    },
  }));
  app.use(express.static(config.staticPath));
  app.use(favicon(path.join(config.staticPath, 'favicon.ico')));


  // TODO find a better place for this
  // app.use('/admin', express.static(`${app.locals.env.root}/admin/dist`));
  // app.get('/admin', (req, res) => {
  //   res.status(200).render('admin');
  // });
};
