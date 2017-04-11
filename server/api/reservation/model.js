'use strict';

const Sequelize = require('sequelize');
const DataTypes = Sequelize.DataTypes;
const restify = require('../../service/restify');
const Gandalf = require('../../service/gandalf');

module.exports = {
  load: (sequelize) => {
    PG.Reservation = sequelize.define('reservation', {
      startTime: { type: DataTypes.DATE, allowNull: false },
      endTime: { type: DataTypes.DATE, allowNull: false },
      acceptedAt: { type: DataTypes.DATE },
      outboundAt: { type: DataTypes.DATE },
      inboundAt: { type: DataTypes.DATE },
      completedAt: { type: DataTypes.DATE },
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
      PG.Reservation,
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
        //     action: Gandalf.expressMW(['admin']),
        //   },
        // ],
      }
    );
  },
  relate: () => {
    PG.Reservation.belongsTo(PG.Item);
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
