var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    scoreCardId: {
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

var ScoreCardKpi = new mongoose.model('scorecardkpis', schema);

module.exports = ScoreCardKpi;