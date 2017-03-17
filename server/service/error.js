'use strict';

class ExtendableError extends Error {
  constructor(message) {
    super(message);
    this.name = this.constructor.name;
    this.message = message;
    if (typeof Error.captureStackTrace === 'function') {
      return Error.captureStackTrace(this, this.constructor);
    }
    this.stack = (new Error(message)).stack;
  }
}

// now I can extend

class HttpError extends ExtendableError {
  constructor(status = 500, message = 'Unknown Error', errors = []) {
    if (_.isArray(status)) {
      errors = status;
      message = errors[0].message;
      status = 500;
    }

    if (_.isArray(message)) {
      errors = message;
      message = errors[0].message;
    }

    if (typeof status === 'string') {
      errors = message;
      message = status;
      status = 500;
    }

    super(message);

    if (status < 400) {
      console.warn(`HttpError created with status ${status}. HttpError should have an error status above 400.`);
    }

    this.status = this.code = status;
    this.errors = errors;
  }
}

const middleware = (err, req, res, next) => {
  if (!(err instanceof HttpError)) { // non-http-error
    return next(err); // pass error to express default error handler
  }
  return res.status(err.status).send({ status: err.status, message: err.message, errors: err.errors });
};

module.exports = {
  HttpError,
  middleware,
};
