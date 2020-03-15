const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    user: {
        type: String,
        required: true,
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
userSchema.pre('save', (next) => {
    next();
});

// After save
userSchema.post('save', () => {
    console.log('User saved');
});


module.exports = mongoose.model('User', userSchema);