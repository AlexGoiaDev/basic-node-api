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
    default: 'kg',
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
  exercise: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exercise',
  },

});

module.exports = mongoose.model('Register', registerSchema);
