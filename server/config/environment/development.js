'use strict';

// Development specific configuration
// ==================================
const path = require('path');

module.exports = {
  staticPath: path.normalize(`${__dirname}/../../../client`),
};
