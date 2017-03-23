'use strict';
exports.upload = (req, res) => {
  res.status(200).send(req.files.map((file) => file.location));
};
