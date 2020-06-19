const mongoose = require('mongoose');
// eslint-disable-next-line no-useless-escape

const exerciseSchema = mongoose.Schema({
  id: {
    type: String,
    required: 'Id is required.',
    minlength: 3,
    maxlength: 30,
  },
  creationDate: {
    type: Date,
    default: new Date(),
    immutable: true,
  },
  es: {
    type: String,
    minlength: 3,
    maxlength: 30,
  },
  en: {
    type: String,
    minlength: 3,
    maxlength: 30,
  },
  personal: {
    type: String,
  },
});

module.exports = mongoose.model('Exercise', exerciseSchema);
