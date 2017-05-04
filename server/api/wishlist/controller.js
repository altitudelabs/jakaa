'use strict';

// Get list of users
exports.me = (req, res, next) => {
  req.user = {
    id: 3,
  };
  PG.Wishlist
    .findAll({
      where: {
        userId: req.user.id
      },
      attributes: ['createdAt'],
      include: [{
        model: PG.Item,
        as: 'item',
        attributes: [
          'title',
          'brand',
          'model',
          'description',
          'purchaseDate',
          'condition',
          'photos',
          'availability',
          'price',
          'deposit',
          'length',
          'height',
          'width',
          'minRentingPeriod',
          'maxRentingPeriod',
        ],
        include: [{
          model: PG.User,
          as: 'owner',
          attributes: ['id', 'email', 'firstName', 'lastName'],
        }, {
          model: PG.Category,
          as: 'category',
          attributes: ['id', 'name', 'shorthand'],
        }],
      }],
    })
    .then((wishlist) => res.status(200).send(wishlist))
    .catch(e => next(e));
};

exports.create = (req, res, next) => {
  req.user = {
    id: 3,
  };
  const userId = _.get(req, 'user.id', null);
  if (_.isNull(userId)) {
    throw new HttpError(422, 'User ID is missing. Please make sure you have logged in');
  }
  const itemId = _.get(req, 'body.itemId', null);
  if (_.isNull(itemId)) {
    throw new HttpError(422, 'Item ID is missing.');
  }
  PG.Item.findOne({ id: itemId })
  .then((foundItem) => {
    if (_.get(foundItem, 'id', null) == null) {
      throw new HttpError(422, 'Item does not exist');
    }
    return PG.Wishlist.create({
      itemId,
      userId,
    });
  })
  .then((savedWishlist) => {
    return res.status(200).send(savedWishlist);
  })
  .catch((err) => {
    next(err);
  });
};

exports.get = (req, res, next) => {
};
