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

const ownerProps = {
  firstName: 'Owen',
  lastName: 'Ownerberg',
  email: 'owner@jakaa.com',
  role: 'user',
  password: 'test',
};

const borrowerProps = {
  firstName: 'Bo',
  lastName: 'Borrowstein',
  email: 'borrower@jakaa.com',
  role: 'user',
  password: 'test',
};

const adminProps = {
  firstName: 'Adam',
  lastName: 'Administhrani',
  email: 'admin@jakaa.com',
  role: 'admin',
  password: 'test',
};

const itemProps = {
  id: 1,
  ownerId: 2,
  categoryId: 1,
  title: 'Nikon D500',
  brand: 'Nikon',
  model: 'd500',
  condition: 'new',
  description: 'Something',
  purchaseDate: '2017-04-10T07:31:51.597Z',
  photos: [
    'http://kenrockwell.com/nikon/images1/d500/1600.jpg',
  ],
  minRentingPeriod: 2,
  maxRentingPeriod: 90,
  availability: [[
    '2017-04-10T07:31:51.597Z',
    '2017-04-30T07:31:51.597Z',
  ]],
  price: 50,
  deposit: 100,
  length: 100,
  height: 100,
  width: 100,
};

const categoryProps = {
  name: 'High-Tech',
  shorthand: 'HT',
};

const reservationProps = {

}

const seedUsers = () => {
  return PG.User.create(adminProps)
  .then(PG.User.create(ownerProps))
  .then(PG.User.create(borrowerProps));
};

const seedItems = () => {
  return PG.Item.create(itemProps);
};

const seedCategories = () => {
  return PG.Category.create(categoryProps);
};

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
      // return;
      return seedUsers()
      .then(() => seedCategories())
      .then(() => seedItems());
      // .then(() => seedCleaningGroup())
      // .then(() => seedEmail())
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
