module.exports = {
  create: (model) => {
    // TODO custom handling based on prop
    // on user
    return (req, res, next) => {
      model.create(req.body)
        .then((created) => {
          res.send(created);
        })
        .catch(e => next(e));
    };
  },
  update: (model) => {
    return (req, res, next) => {
      model.update(req.body, {
        id: req.params.id,
      })
        .then((updated) => {
          res.send(updated);
        })
        .catch((e) => next(e));
    };
  },
  getSingle: (model) => {
    return (req, res, next) => {
      model.findById(req.params.id)
        .then((found) => {
          if (found === null) {
            throw new HttpError(404, `${model.name} not found`);
          }
          res.send(found);
        })
        .catch((e) => next(e));
    };
  },
  getAll: (model) => {
    return (req, res, next) => {
      model.findAll(req.query)
        .then((found) => {
          if (found === null) {
            throw new HttpError(404, `${model.tableName} not found`);
          }

          res.send(found);
        })
        .catch((e) => next(e));
    };
  },
  delete: (model) => {
    return (req, res, next) => {
      model.delete(req.param.id)
        .then(() => {
          res.send('success');
        })
        .catch((e) => next(e));
    };
  },
};
