const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    creationDate: {
        type: Date,
        default: new Date()
    }
});

// Before save
userSchema.pre('save', () => {
    console.log('Pre save user');
});

// After save
userSchema.post('save', () => {
    console.log('User saved');
});

module.exports = mongoose.model('User', userSchema);