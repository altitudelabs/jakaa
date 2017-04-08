const path = require('path');
const fs = require('fs');
const Promise = require('bluebird');
const _ = require('lodash');
const config = require('../config/environment');
const bcryptService = require('../service/bcrypt');
let resetTable = false;

const noModelAPIFolders = ['s3'];

if (config.env === 'development') {
  resetTable = true;
}

module.exports = (sequelize) => {
  const models = fs.readdirSync(path.join(__dirname, '../api'))
  .filter(file => file.indexOf('.') === -1 && !_.includes(noModelAPIFolders, file)) // extension does not exist -> it's a folder)
  .map(folder => require(path.join(__dirname, '../api', folder)).model); // eslint-disable-line global-require

  models.forEach(model => {
    model.load(sequelize);
    model.postLoad();
  });
  models.forEach(model => {
    model.relate();
  });

  return sequelize.sync({ force: resetTable })
  .then(() => {
    if (resetTable) {
      console.log('DB Tables have been reset');
    }
  })
  .then(() => {
    if (resetTable) {
      return;
      // return seedCommunity()
      // .then(() => seedCleaningGroup())
      // .then(() => seedEmail())
      // .then(() => seedRoom())
      // .then(() => seedTenant())
      // .then(() => seed());
    }
    return;
  })
  .catch((e) => {
    console.log('there was a problem with syncing pg');
    console.log(e);
  });
};
