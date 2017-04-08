'use strict';

const config = require('../config/environment');
const jwt = require('jsonwebtoken');
const compose = require('composable-middleware');

function attachUserToReq() {
  return compose()
    .use((req, res, next) => {
      console.log('user id from jwt is ');
      console.log(req.user);
      PG.User.findOne({ where: { id: req.user ? req.user.id : undefined, isDeleted: false } })
        .then((user) => {
          if (!user) {
            req.user = null;
            delete req.session.token;
            return next();
          }
          req.user = user;
          req.session.token = genTokenFromId(req.user.id);
          next();
        })
        .catch((e) => next(e));
    });
}

function genTokenFromId(id) {
  return jwt.sign({ id }, config.secrets.token, { expiresIn: config.expireTimes.token });
}

function genMobileTokenFromId(id) {
  // no expired time
  return jwt.sign({ id }, config.secrets.token);
}
function getTokenFromReq(req) {
  if (req.headers.token) {
    return req.headers.token;
  }

  if (req.session && req.session.token) {
    return req.session.token;
  }

  return null;
}

function getUserFromToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, config.secrets.token, (err, decoded) => {
      if (err) {
        return reject({
          status: 401,
          message: 'Invalid token. Please sign in again',
        });
      }

      PG.User.findOne({ where: { id: decoded.id } })
      .then((user) => {
        if (!user) {
          return reject({
            status: 401,
            message: "We can't recognize who you are. Please sign in again",
          });
        }

        resolve(user.toPublic());
      });
    });
  });
}

module.exports.attachUserToReq = attachUserToReq;
module.exports.genTokenFromId = genTokenFromId;
module.exports.genMobileTokenFromId = genMobileTokenFromId;
module.exports.getTokenFromReq = getTokenFromReq;
module.exports.getUserFromToken = getUserFromToken;
