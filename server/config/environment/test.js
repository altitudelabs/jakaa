'use strict';

const path = require('path');

module.exports = {
  staticPath: path.normalize(`${__dirname}/../../../client`),
  // MongoDB connection options
  port: 3001,
  mongo: {
    uri: 'mongodb://localhost/react-boilerplate-test',
    options: {
      db: {
        safe: true,
      },
    },
  },
};
