'use strict';
const path = require('path');
const _ = require('lodash');
const fs = require('fs');

// setting environment variables mannually if they are not already set via bash profile
if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
  try {
    fs.accessSync(path.normalize(`${__dirname}/default-env.js`), fs.F_OK);
    require('./default-env'); // eslint-disable-line global-require
  } catch (e) {
    console.warn(
      [
        'You are in development, but default-env.js does not exist.',
        'default-env is the intended way of setting environment variable in development.',
        'Please ensure you have set your environment variables correctly.',
      ].join('\n')
    );
  }
}

// All configurations will extend these options.
// Will represent production env unless overwritten
// ============================================
let defaultConfig = {
  env: process.env.NODE_ENV || 'development',

  // Root path of server
  root: path.normalize(`${__dirname}/../../..`),
  staticPath: path.normalize(`${__dirname}/../../../client/dist`),

  // Server port
  port: process.env.PORT || 3000,

  // Secret for session, you will want to change this and make it an environment letiable
  secrets: {
    session: process.env.SESSION_SECRET || 'instant pig',
    token: process.env.TOKEN_SECRET || 'instant pig',
  },

  expireTimes: {
    token: process.env.TOKEN_EXPIRE_TIME || 7 * 24 * 60 * 60, // seconds
  },

  encryptionRounds: 10,

  aws: {
    accessKey: process.env.AWS_ACCESS_KEY,
    secretKey: process.env.AWS_SECRET_KEY,
    s3: {
      bucketName: 'template-react',
    },
    sns: {
      region: 'ap-southeast-1', // singapore
      PlatformApplicationArn: process.env.AWS_SANDBOX_SNS_PLATFORM_APP_ARN,
    },
    ses: {
      sender: 'tester@altitudelabs.com',
      region: 'us-west-2', // US West - Oregon
    },
  },

  // MongoDB connection options
  mongo: {
    uri: 'mongodb://localhost/jakaa',
    options: {
      db: {
        safe: true,
      },
    },
  },
  postgres: {
    name: 'jakaa',
  },
  maxTotalUploadSize: 1024 * 1024 * 50, // 50MB
};

// merge defaultconfig with environment specific config
defaultConfig = _.merge(
  defaultConfig,
  require(`${__dirname}/${defaultConfig.env}.js`) || {} // eslint-disable-line global-require
);

module.exports = defaultConfig;
