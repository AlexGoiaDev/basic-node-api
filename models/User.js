const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10;

var validateEmail = (email) => {
    return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,5})+$/.test(email);
};

const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: 'Email is required.',
        unique: true,
        minlength: 8,
        maxlength: 200,
        validate: [validateEmail, 'Please fill a valid email.']
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
    }
});

const hashPassword = (userToSave, next) => {
    bcrypt.genSalt(saltRounds, (err, salt) => {
        bcrypt.hash(userToSave.password, salt, (err, hash) => {
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
})

// After save
userSchema.post('save', () => {
    console.log('User saved');
});

userSchema.methods.comparePassword = function (pw, cb) {
    bcrypt.compare(pw, this.password, function (err, isMatch) {
        if (err) {
            return cb(err);
        }
        cb(null, isMatch);
    });
};

module.exports = mongoose.model('User', userSchema);