const handleMongoErrors = (err, req, res) => {
  switch (err.code) {
    case 11000:
      res.status(409).send({
        message: 'User already exists.',
      });
      break;
    default:
      res.status(500).send({
        err,
        message: 'Server error.',
      });
      break;
  }
};

const hanldeValidationsErrors = (err, req, res) => {
  res.status(400).send({
    message: err.message,
  });
};

const handleClientError = (err, req, res) => {
  res.status(err.code).send({
    message: err.message,
  });
};

const defaultError = (error, req, res) => {
  res.status(500).send({
    error,
    message: 'Server error.',
  });
};

module.exports = (err, req, res) => {
  if (err) {
    switch (err.name) {
      case 'MongoError':
        handleMongoErrors(err, req, res);
        break;
      case 'ValidationError':
        hanldeValidationsErrors(err, req, res);
        break;
      case 'ClientError':
        handleClientError(err, req, res);
        break;
      default:
        defaultError(err, req, res);
        break;
    }
  } else {
    defaultError(err, req, res);
  }
};
