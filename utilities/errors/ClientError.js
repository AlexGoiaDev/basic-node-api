class ClientError extends Error {
  constructor(...args) {
    super(...args);
    this.name = 'ClientError';
  }
}

module.exports = ClientError;
