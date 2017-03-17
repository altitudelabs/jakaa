const HttpError = require('../service/error').HttpError;
const _ = require('lodash');
module.exports = () => {
  global.HttpError = HttpError;
  global.PG = {}; // postgres
  global._ = _;
};
