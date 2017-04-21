'use strict';

const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;
const restify = require('../../service/restify');
const Gandalf = require('../../service/gandalf');

module.exports = {
  load: (sequelize) => {
    PG.Like = sequelize.define('like', {

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
      PG.Like,
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
    PG.Like.belongsTo(PG.User, { as: 'user', foreignKey: { allowNull: false } });
    PG.Like.belongsTo(PG.Item, { as: 'item', foreignKey: { allowNull: false } });
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
