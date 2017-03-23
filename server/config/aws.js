/**
* AWS configuration
*/

'use strict';

const config = require('./environment');
const aws = require('aws-sdk');
const Promise = require('bluebird');
module.exports = () => {
  // AWS config
  aws.config.setPromisesDependency(Promise);
  aws.config.update({
    accessKeyId: config.aws.accessKey,
    secretAccessKey: config.aws.secretKey,
  });
};
