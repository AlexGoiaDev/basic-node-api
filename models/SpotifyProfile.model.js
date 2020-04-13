/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');

// eslint-disable-next-line no-useless-escape
const validateEmail = (email) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/.test(email);

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: 'Email is required.',
    unique: true,
    minlength: 3,
    maxlength: 200,
    validate: [validateEmail, 'Please fill a valid email.'],
  },
  country: {
    type: String,
    minlength: 2,
    maxlength: 4,
  },
  display_name: {
    type: String,
    minlength: 3,
    maxlength: 200,
  },
  uri: {
    type: String,
    minlength: 1,
    maxlength: 1000,
  },
  imageUrl: {
    type: String,
    minlength: 3,
    maxlength: 1000,
  },
  product: {
    type: String,
    enum: ['premium', 'free', 'open'],
  },
  creationDate: {
    type: Date,
    default: new Date(),
    immutable: true,
  },
});


module.exports = mongoose.model('User', userSchema);
