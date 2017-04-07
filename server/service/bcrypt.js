'use strict';

const config = require('../config/environment');
const Promise = require('bluebird');
const bcrypt = require('bcrypt');

module.exports.encryptPassword = (str) => {
  return new Promise((resolve, reject) => {
    bcrypt.genSalt(config.encryptionRounds, (genErr, salt) => {
      if (genErr) return reject(genErr);

      bcrypt.hash(str, salt, (err, hash) => {
        if (err) return reject(err);

        resolve(hash);
      });
    });
  });
};

module.exports.comparePassword = (originalPassword, hashPassword) => {
  return new Promise((resolve, reject) => {
    bcrypt.compare(originalPassword, hashPassword, (err, match) => {
      if (err) return reject(err);

      if (!match) {
        return reject({ status: 401, message: 'password is wrong!' });
      }

      resolve();
    });
  });
};
