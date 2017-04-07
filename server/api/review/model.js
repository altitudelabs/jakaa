'use strict';

const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;
const restify = require('../../service/restify');

module.exports = {
  load: (sequelize) => {
    PG.Review = sequelize.define('review', {
      password: { type: DataTypes.STRING, allowNull: false },
      email: { type: DataTypes.STRING, allowNull: false },
      firstName: { type: DataTypes.STRING },
      lastName: { type: DataTypes.STRING },
    });
  },
  postLoad: () => {
    restify.register(
      PG.Review,
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
    PG.Review.belongsTo(PG.User, { as: 'reviewer' });
  },
};
