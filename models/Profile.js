const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    age: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }


});
module.exports = Profile = mongoose.model('profile', ProfileSchema);