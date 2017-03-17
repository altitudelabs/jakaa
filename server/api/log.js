'use strict';

const bunyan = require('bunyan');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const stream = require('stream');
const Writable = stream.Writable;


const LoggerSchema = mongoose.model(
  'Log',
  new Schema({
    name: String,
    hostname: String,
    pid: Number,
    level: Number,
    requestId: String,
    time: Date,
    msg: String,
    req: Object,
    res: Object,
  }, {
    capped: {
      size: 1200000, // ~= 1MB
      max: 5000, // only 5000 records at a time
      autoIndexId: true,
    },
  })
);


class customWritable extends Writable {
  _write(chunk, enc, cb) {
    new LoggerSchema(
      JSON.parse(chunk.toString())
    ).save();
    return cb();
  }
}

module.exports = bunyan.createLogger({
  name: 'API-logger',
  serializers: {
    req: reqSerializer,
    res: resSerializer,
  },
  streams: [{
    stream: new customWritable(),
  }],
});

function reqSerializer(req) {
  return {
    method: req.method,
    url: req.url,
    headers: req.headers,
    params: req.params,
    query: req.query,
    body: req.body,
  };
}

function resSerializer(res) {
  return {
    statusCode: res.statusCode,
    statusMessage: res.statusMessage,
    header: res._header,
  };
}
