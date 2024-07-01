var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    plan_id: {
        type: String,
        required: true,
    },
    kpi_id: {
        type: String,
        required: true,
    },
    kpi_title: {
        type: String,
        required: true,
    },
    kpi_type: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
    q1: {
        type: String,
        required: true,
    },
    q2: {
        type: String,
        required: true,
    },
    q3: {
        type: String,
        required: true,
    },
    q4: {
        type: String,
        required: true,
    },

});

var ScenerioPlanData = new mongoose.model('scenerioplandatas', schema);

module.exports = ScenerioPlanData;