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
  resetPasswordToken: {
    type: String,
  },
  resetPasswordTokenDate: {
    type: Date,
  },

});

const hashPassword = (userToSave, next) => {
  bcrypt.genSalt(saltRounds, (err, salt) => {
    bcrypt.hash(userToSave.password, salt, (hashError, hash) => {
      if (hashError) throw hashError;
      userToSave.password = hash;
      next();
    });
  });
};

// Before save
userSchema.pre('save', function (next) {
  const userToSave = this;
  hashPassword(userToSave, next);
});

userSchema.pre('update', function (next) {
  const userToUpdate = this;
  hashPassword(userToUpdate, next);
});

// After save
userSchema.post('save', () => {});

userSchema.methods.comparePassword = function (pw, cb) {
  // eslint-disable-next-line consistent-return
  bcrypt.compare(pw, this.password, (err, isMatch) => {
    if (err) {
      return cb(err);
    }
    cb(null, isMatch);
  });
};

module.exports = mongoose.model('User', userSchema);
