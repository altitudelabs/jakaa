'use strict';

const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;
const restify = require('../../service/restify');

module.exports = {
  load: (sequelize) => {
    PG.Room = sequelize.define('room', {
      name: { type: DataTypes.STRING },
      building: { type: DataTypes.STRING },
      address: { type: DataTypes.STRING },
      community: {
        type: DataTypes.ENUM,
        defaultValue: 'TST',
        values: ['TST', 'CWB1', 'CWB2', 'Wan Chai'],
      },
    });
  },
  postLoad: () => {
    restify.register(
      PG.Room,
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
    // PG.User.hasMany(PG.Review, { as: 'reviewer', foreignKey: 'reviewerId' });
  },
};
