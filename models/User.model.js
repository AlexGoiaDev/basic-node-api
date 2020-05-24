/* eslint-disable no-underscore-dangle */
/* eslint-disable func-names */
/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const crypto = require('crypto');

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
  img: {
    type: String,
  },
  loginStrategy: {
    type: String,
    enum: ['email', 'gmail'],
    default: 'email',
  },
  resetPasswordToken: {
    type: String,
  },
  resetPasswordTokenDate: {
    type: Date,
  },
  stripeCustomerId: {
    type: String,
  },
  activated: {
    type: Boolean,
    default: false,
  },
  activateToken: {
    type: String,
  },

});

// Esta función se ejecutará en un try and catch
const hashPass = (element, next) => {
  element.password = bcrypt.hashSync(element.password, bcrypt.genSaltSync(saltRounds));
  if (element.loginStrategy === 'email' && element.activated === false && !element.activateToken) {
    element.activateToken = crypto.randomFillSync(Buffer.alloc(128), 0, 128).toString('hex');
  }
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

userSchema.methods.getBasicInfo = function () {
  const user = this.toObject();
  delete user.password;
  delete user.activateToken;
  delete user.resetPasswordToken;
  delete user.resetPasswordTokenDate;
  return user;
};

module.exports = mongoose.model('User', userSchema);
