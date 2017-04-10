'use strict';

const express = require('express');
const controller = require('./controller');
const router = express.Router();
const authenticate = require('../middleware/authenticate');

router.post('/', controller.index);
// router.delete('/', controller.logout);
router.post('/register', controller.register);
// router.post('/resendVerifyEmail', controller.resendVerifyEmail);
// router.get('/forgotpassword', controller.forgotPassword);
// router.post('/resetpassword/:token', controller.resetPassword);
// router.get('/verifyemail/:token', controller.verifyEmail);
// router.get('/invalidate/:token', controller.invalidateEmail);

module.exports = router;
