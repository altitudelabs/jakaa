'use strict';

const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;
const restify = require('../../service/restify');

module.exports = {
  load: (sequelize) => {
    PG.User = sequelize.define('user', {
      role: {
        type:   DataTypes.ENUM,
        defaultValue: 'user',
        values: ['user', 'admin'],
      },
      password: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      firstName: { type: DataTypes.STRING },
      lastName: { type: DataTypes.STRING },
    });
  },
  postLoad: () => {
    restify.register(
      PG.User,
      {
        include: [
          'create',
          'update',
          'getAll',
          'getSingle',
          'delete',
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
