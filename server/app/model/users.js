var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        default: null,
        required: true
    },
    lastName: {
        type: String,
        default: null,
        required: true
    },
    country: {
        type: String,
        default: null,
        required: true
    },
    password: {
        type: String,
        default: null,
        required: true
    },
    status: {
        type: String,
        default: 1,
    },
    email_verified_at: {
        type: String,
        default: null,
    },
    image: {
        type: String,
        default: null,
    },
    plan_id: {
        type: String,
        default: null,
    },

    stripe_user_id: {
        type: String,
        default: null,
    },

    stripe_sub_id: {
        type: String,
        default: null,
    },
    
});

var user = new mongoose.model('User', schema);

module.exports = user;