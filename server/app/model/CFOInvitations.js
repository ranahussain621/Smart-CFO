var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
    },
    company_id: {
        type: String,
        required: true
    },
    token: {
        type: String,
        default: null,
        required: true
    },

});

var CFOInvitations = new mongoose.model('cfoinvitations', schema);

module.exports = CFOInvitations;