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

});

var PlanKpi = new mongoose.model('plankpis', schema);

module.exports = PlanKpi;