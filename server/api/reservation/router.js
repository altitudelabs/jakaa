'use strict';

const express = require('express');
const controller = require('./controller');
const router = express.Router();

// router.get('/', controller.index);
router.post('/', controller.makeReservation);
router.get('/details/:id', controller.getRequestDetails);

module.exports = router;
