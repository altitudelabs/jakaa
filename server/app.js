/**
* Main Express Application File
*/
'use strict';
// Set default node environment to development
// process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const express = require('express');
const config = require('./config/environment');
// Setup server
const errorService = require('./service/error');
const restify = require('./service/restify')({ routerPrefix: 'REST' });
const configExpress = require('./config/express');
const configRoutes = require('./routes'); // web view routes
const configApi = require('./api'); // api
const app = express();

app.locals.env = config;

const server = require('http').createServer(app);

require('./config/global')();
require('./config/promise')();
require('./config/mongoose')();
require('./config/aws')();
require('./config/express')(app);
require('./auth')(app); // auth

require('./config/postgress')()
  .then(() => {
    configExpress(app);
    configRoutes(app);
    configApi(app);
    restify.serve(app);

    app.use((req, res) => {
      res.status(200).render('index');
    });
    app.use(errorService.middleware);

    // Start server
    server.listen(config.port, config.ip, () => {
      console.log('Express server listening on %d, in %s mode', config.port, config.env);
    });
    // Expose app
    exports = module.exports = app;
  });
