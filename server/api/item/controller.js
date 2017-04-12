'use strict';

// Get list of users
exports.getItemDetails = (req, res, next) => {
  PG.Item
  .findOne({
    where: { id: req.params.id },
    include: [{
      model: PG.User,
      as: 'owner',
      attributes: ['id', 'role', 'email', 'firstName', 'firstName', 'createdAt', 'updatedAt']

    }, {
      model: PG.Category,
      as: 'category',
    }],
  }).then((result) => {
    res.status(200).send(result);
  })
  .catch((err) => {
    next(err);
  });
};

exports.search = (req, res, next) => {
  
}
