const Sequelize = require('sequelize');
const path = require('path');
const fs = require('fs');
const config = require('./environment');
// NOTE workaround for https://github.com/sequelize/sequelize/issues/3781
const pg = require('pg');
delete pg.native;
// end NOTE

module.exports = () => {
  const sequelize = new Sequelize(config.postgres.name, 'postgres', '', {
    host: 'localhost',
    dialect: 'postgres',
    logging: false,
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
    },
  });

  const models = fs.readdirSync(path.join(__dirname, '../api'))
    .filter(file => file.indexOf('.') === -1) // extension does not exist -> it's a folder)
    .map(folder => require(path.join(__dirname, '../api', folder)).model) // eslint-disable-line global-require
    .filter(model => !!model);

  models.forEach(model => {
    model.load(sequelize);
    model.postLoad();
  });
  models.forEach(model => {
    model.relate();
  });

  return sequelize.sync({ force: true })
    .then(() => {
      console.log('all pg sync complete');
    })
    .then(() => {
      if (config.env === 'development') {
        require('../service/seed.js')(sequelize); // eslint-disable-line global-require
      }
    })
    .catch((e) => {
      console.log('there was a problem with syncing pg');
      console.log(e);
    });
};

function breakCircular(obj) {
  const seen = [];
  return JSON.parse(
    JSON.stringify(obj, (key, val) => {
      if (val != null && typeof val === 'object') {
        if (seen.indexOf(val) >= 0) return;
        seen.push(val);
      }
      return val;
    })
  );
}
