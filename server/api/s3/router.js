'use strict';

const express = require('express');
const controller = require('./controller');
const router = express.Router();
const config = require('../../config/environment');
const aws = require('aws-sdk');
const multer = require('multer');
const multerS3 = require('multer-s3');

const s3 = new aws.S3();
const metadata = (req, file, cb) => {
  cb(null, { fieldName: file.fieldname });
};
const key = (req, file, cb) => {
  const time = new Date().getTime();
  const destFileName = `${time}-${file.originalname}`;
  cb(null, destFileName.toString());
};

const upload = multer({
  storage: multerS3({
    s3,
    bucket: config.aws.s3.bucketName,
    acl: 'public-read',
    metadata,
    key,
  }),
});

router.post(
  '/',
  upload.array('photos'),
  (err, req, res, next) => {
    console.log(err);
    next(err);
  },
  controller.upload
);

module.exports = router;
