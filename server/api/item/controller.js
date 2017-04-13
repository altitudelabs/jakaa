'use strict';
const _ = require('lodash');

const validSearchKeys = [
  'title',
  'brand',
  'model',
  'condition',
  'description',
  'description',
  'maxRentingPeriod',
  'availability',
  'price',
];


// Get one item with owner and category details
exports.getItemDetails = (req, res, next) => {
  PG.Item
  .findOne({
    where: { id: req.params.id },
    include: [{
      model: PG.User,
      as: 'owner',
      attributes: ['id', 'role', 'email', 'firstName', 'firstName', 'createdAt', 'updatedAt'],
    }, {
      model: PG.Category,
      as: 'category',
    }],
  })
  .then((result) => {
    res.status(200).send(result);
  })
  .catch((err) => {
    next(err);
  });
};

exports.search = (req, res, next) => {
  const validSearchParams = _.pick(req.query, validSearchKeys);
  const limit = _.get(req, 'query.limit', 10);
  const skip = _.get(req, 'query.skip', 0);
  PG.Item.findAll({
    where: validSearchParams,
    limit,
    offset: skip,
  })
  .then((results) => {
    res.status(200).send(results);
  })
  .catch((err) => {
    next(err);
  });
};
