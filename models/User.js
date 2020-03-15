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

// After save
userSchema.post('save', () => {
    console.log('User saved');
});


module.exports = mongoose.model('User', userSchema);