/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');

const exerciseSchema = mongoose.Schema({
  id: {
    type: String,
    unique: true,
    required: 'Exercise id is required',
  },
  es: {
    type: String,
  },
  en: {
    type: String,
  },
});

module.exports = mongoose.model('Exercise', exerciseSchema);
