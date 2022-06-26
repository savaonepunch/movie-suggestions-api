const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 255
    },
    email: {
        type: String,
        required: true,
        minLength: 3,
        maxLength: 255
    },
    password: {
        type: String,
        required: true,
        maxLength: 1024
    },
    registration_date: {
        type: Date,
        required: true,
        default: Date.now
    }
}, { versionKey: false });

module.exports = mongoose.model('User', userSchema);