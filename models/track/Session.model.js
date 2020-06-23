/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');

const sessionSchema = mongoose.Schema({
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  registers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Register',
    },
  ],
  date: {
    type: Date,
    default: new Date(),
    immutable: true,
  },
});

module.exports = mongoose.model('Session', sessionSchema);
