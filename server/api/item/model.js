'use strict';

const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;
const restify = require('../../service/restify');
const Gandalf = require('../../service/gandalf');
const _ = require('lodash');
const moment = require('moment');
const validator = require('validator');

module.exports = {
  load: (sequelize) => {
    PG.Item = sequelize.define('item', {
      title: { type: DataTypes.STRING, allowNull: false },
      brand: { type: DataTypes.STRING, allowNull: false },
      model: { type: DataTypes.STRING, allowNull: false },
      condition: {
        type: DataTypes.ENUM,
        defaultValue: 'new',
        values: ['new', 'used-no-damages', 'used-minor-damages', 'used-major-damages', 'unknown'],
      },
      description: { type: DataTypes.TEXT, allowNull: false },
      purchaseDate: { type: DataTypes.DATE, allowNull: false },
      photos: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        validate: {
          hasOnePhoto: function(value) {
            if (value.length === 0) {
              throw new Error('Item needs to have atleast 1 photo');
            }
            _.each(value, function (url) {
              if (!validator.isURL(url)) {
                throw new Error(`${url} is not a valid URL`);
              }
            });
            return true;
          },
        },
      },
      minRentingPeriod: {
        // User cannot specify that the minimum renting period is greater than a year
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: 1,
          max: 14,
        },
      },
      maxRentingPeriod: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          min: function (value) {
            if (value <= this.minRentingPeriod) {
              throw new Error(`Your maximimum renting perdiod has to be atleast ${parseInt(this.minRentingPeriod, 10) + 1} days`);
            }
            return true;
          },
          max: 90,
        },
      },
      availability: {
        type: Sequelize.ARRAY(Sequelize.RANGE(Sequelize.DATE)),
        allowNull: false,
        validate: {
          doAllRangesComplyWithMinRentingPeriod: function (value) {
            _.each(value, (range) => {
              const start = moment(range[0]);
              const end = moment(range[1]);
              const diff = end.diff(start, 'days');
              if (diff < this.minRentingPeriod) {
                throw new Error(`One of the availability slots range from ${start} to ${end} ` +
                                `which is ${diff} days long and is less than the minimum renting ` +
                                `period of ${this.minRentingPeriod} days`);
              }
            });
          },
        },
      },
      price: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
          min: {
            args: [50],
            msg: 'Price for any item needs to be above HKD$50'
          },
          max: {
            args: [10000],
            msg: 'Price for any item needs to be below HKD$10000'
          },
        },
      },
      deposit: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
          min: {
            args: [100],
            msg: 'Security Deposit for any item needs to be above HKD$100',
          },
          max: {
            args: [10000],
            msg: 'Security Deposit for any item needs to be below HKD$10000',
          },
        },
      },
      length: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
          min: {
            args: [10],
            msg: 'Length for any item needs to be above 10mm',
          },
          max: {
            args: [10000],
            msg: 'Length for any item needs to be below 10000mm',
          },
        },
      },
      height: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
          min: {
            args: [10],
            msg: 'Height for any item needs to be above 10mm',
          },
          max: {
            args: [10000],
            msg: 'Height for any item needs to be below 10000mm',
          },
        },
      },
      width: {
        type: DataTypes.DOUBLE,
        allowNull: false,
        validate: {
          min: {
            args: [10],
            msg: 'Width for any item needs to be above 10mm',
          },
          max: {
            args: [10000],
            msg: 'Width for any item needs to be below 10000mm',
          },
        },
      },
    }, {
      timestamps: true,
      paranoid: true,
    });
  },
  postLoad: () => {
    const userLevelAuthMiddlewares = _.map(['update', 'getAll', 'getSingle'], (route) => {
      return {
        stage: 'pre',
        target: route,
        action: Gandalf.expressMW(['user', 'admin']),
      };
    });
    restify.register(
      PG.Item,
      {
        include: [
          'update',
          'getAll',
          'getSingle',
          'delete',
          'create',
        ],
        // middlewares: [...userLevelAuthMiddlewares,
        //   {
        //     stage: 'pre',
        //     target: 'delete',
        //     action: Gandalf.expressMW(['user', 'admin']),
        //   },
        // ],
      }
    );
  },
  relate: () => {
    PG.Item.belongsTo(PG.User, { as: 'owner' });
  },
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
