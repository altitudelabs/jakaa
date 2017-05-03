'use strict';

const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;
const restify = require('../../service/restify');
const Gandalf = require('../../service/gandalf');

module.exports = {
  load: (sequelize) => {
    PG.Category = sequelize.define('category', {
      name: { type: DataTypes.STRING, allowNull: false },
      shorthand: {
        type: DataTypes.STRING,
        allowNull: false,
        set: function (value) {
          this.setDataValue('shorthand', value.toUpperCase());
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
      PG.Category,
      {
        include: [
          'update',
          'getAll',
          'getSingle',
          'delete',
          'create',
        ],
        middlewares: [...userLevelAuthMiddlewares,
          {
            stage: 'pre',
            target: 'delete',
            action: Gandalf.expressMW(['admin']),
          },
        ],
      }
    );
  },
  relate: () => {
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
