'use strict';

const express = require('express');
const controller = require('./controller');
const router = express.Router();

// router.get('/', controller.index);
// router.post('/', controller.create);
router.get('/search', controller.search);
router.get('/:id', controller.getItemDetails);

module.exports = router;
