'use strict';

const Sequelize = require('sequelize');
const restify = require('../../service/restify');

module.exports = {
  load: (sequelize) => {
    PG.Review = sequelize.define('review', {
      password: { type: Sequelize.STRING, allowNull: false },
      email: { type: Sequelize.STRING, allowNull: false },
      firstName: { type: Sequelize.STRING },
      lastName: { type: Sequelize.STRING },
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
