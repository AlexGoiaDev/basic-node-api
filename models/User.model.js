/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const saltRounds = 10;

// eslint-disable-next-line no-useless-escape
const validateEmail = (email) => /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/.test(email);

const userSchema = mongoose.Schema({
  email: {
    type: String,
    required: 'Email is required.',
    unique: true,
    minlength: 8,
    maxlength: 200,
    validate: [validateEmail, 'Please fill a valid email.'],
  },
  password: {
    type: String,
    required: 'Password is required.',
    minlength: 4,
    maxlength: 30,
  },
  creationDate: {
    type: Date,
    default: new Date(),
    immutable: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin'],
    default: 'user',
  },
  loginStrategy: {
    type: String,
    enum: ['email', 'google', 'spotify'],
    default: 'email',
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordTokenDate: {
    type: Date,
  },

});

// Esta función se ejecutará en un try and catch
const hashPass = (element, next) => {
  element.password = bcrypt.hashSync(element.password, bcrypt.genSaltSync(saltRounds));
  next();
};

function preHashPassword(next) {
  hashPass(this, next);
}

userSchema.pre('save', preHashPassword);
userSchema.pre('update', preHashPassword);
userSchema.pre('findOneAndUpdate', function (next) {
  const element = this.getUpdate();
  if (element && element.password) {
    hashPass(element, next);
  } else {
    next();
  }
});
userSchema.post('save', () => { });

module.exports = mongoose.model('User', userSchema);
