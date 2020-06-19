const mongoose = require('mongoose');
// eslint-disable-next-line no-useless-escape

const registerSchema = mongoose.Schema({
  creationDate: {
    type: Date,
    default: new Date(),
    immutable: true,
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  duration: {
    type: Number,
  },
  registers: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Register',
    },
  ],
});

module.exports = mongoose.model('Register', registerSchema);
