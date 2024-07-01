var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    Goal: {
        type: String,
        required: true,
    },
    company_id: {
        type: String,
        default: null
    },

    startDate: {
        type: Date,
        default: Date.now
    },

    endDate: {
        type: Date,
        default: Date.now
    },
    editingStatus: {
        type: Boolean,
        default: true
    },
    created_at: {
        type: Date,
        default: Date.now
    }
});

var Plans = new mongoose.model('plans', schema);

module.exports = Plans;
