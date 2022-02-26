

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        min:3,
        max:25
    },
    email: {
        type: String,
        required: true,
        min:3,
        max:100
    },
    password: {
        type: String,
        required: true,
        min:3,
        max:1024
    },

    isVerified: {
        type: Boolean,
        default: false,
    },

    googleId: {
        type: String,
    },
    provider: {
        type: String,
        required: true,
    }
});

module.exports = mongoose.model('user', userSchema);
