var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    plan_id: {
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
    industryName: {
        type: String,
        required: true,
    },
    created_at: {
        type: Date,
        default: Date.now
    }

});

var ScenerioPlaning = new mongoose.model('scenerioplanings', schema);

module.exports = ScenerioPlaning;