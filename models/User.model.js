const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    creationDate: {
        type: Date,
        default: new Date()
    }
});

// Before save
userSchema.pre('save', (next) => {
    next();
});

userSchema.post('save', (next) => {
    console.log('User saved');
    next();
});


module.exports = mongoose.model('User', userSchema);