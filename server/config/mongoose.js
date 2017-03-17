/**
* Mongoose configuration
*/

'use strict';

const mongoose = require('mongoose');
const config = require('./environment');
const Promise = require('bluebird');

module.exports = () => {
  // use bluebird promise
  mongoose.Promise = Promise;

  // Connect to database
  mongoose.connect(config.mongo.uri, config.mongo.options);
};
