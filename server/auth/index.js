'use strict';

let router = require('./router');

module.exports = (app) => {
  app.use('/auth', router);
};
