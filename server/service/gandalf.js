const _ = require('lodash');
const config = require('../config/environment');

class Gandalf {
  checkAccess(permission, role) {
    if (!_.isArray(permission)) { permission = [permission]; }
    return _.some(permission, (v) => v === role);
  }
  expressMW(permission) {
    return (req, res, next) => {
      if (
        !req.user ||
        !this.checkAccess(permission, req.user.role)
      ) {
        if (config.env === 'development' || config.env === 'staging') {
          console.warn('Gandalf stopped the user.');
          console.warn(`user role is ${req.user ? req.user.role : undefined}`);
          console.warn(`path is allowed for ${permission}`);
        }
        throw new HttpError(401, 'You Shall Not Pass!');
      }
      return next();
    };
  }
}

module.exports = new Gandalf();
