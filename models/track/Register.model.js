/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');

const registerSchema = mongoose.Schema({
  weight: {
    type: Number,
  },
  weightUnit: {
    type: String,
  },
  repetitions: {
    type: Number,
  },
  duration: {
    type: Number,
  },
  session: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Session',
  },

});

module.exports = mongoose.model('Register', registerSchema);
