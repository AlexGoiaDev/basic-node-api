class ClientError extends Error {
    name;
    constructor(...args) {
        super(...args);
        this.name = 'ClientError';
    }
};

module.exports = ClientError;