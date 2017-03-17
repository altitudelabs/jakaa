'use strict';

/**
* Bluebird configuration
*/

const Promise = require('bluebird');

module.exports = () => {
  Promise.config({
    // mongo-connect causes bluebird to throw unnecessary warnings
    warnings: false,
    cancellation: true,
  });
};
