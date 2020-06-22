
const handleMongoErrors = (err, req, res) => {
  switch (err.code) {
    case 11000:
      return res.status(409).send({
        message: 'Element already exists.',
      });
    default:
      return res.status(500).send({
        err,
        message: 'Server error.',
      });
  }
};

const hanldeValidationsErrors = (err, req, res) => res.status(400).send({
  message: err.message,
});

const handleClientError = (err, req, res) => res.status(err.code).send({
  message: err.message,
});


const defaultError = (err, req, res) => res.status(500).send({
  err,
  message: 'Server error.',
});

const errorHandler = (err, req, res, next) => {
  if (err) {
    console.log('Error', err);
    switch (err.name) {
      case 'MongoError':
        return handleMongoErrors(err, req, res, next);
      case 'ValidationError':
        return hanldeValidationsErrors(err, req, res, next);
      case 'ClientError':
        return handleClientError(err, req, res, next);
      default:
        return defaultError(err, req, res, next);
    }
  } else {
    return next();
  }
};


module.exports = { errorHandler };
