'use strict';

const express = require('express');
const controller = require('./controller');
const router = express.Router();

// router.get('/', controller.index);
// router.post('/', controller.create);
router.get('/:id', controller.getItemDetails);

module.exports = router;
