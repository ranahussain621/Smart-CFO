var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    Kpi_type: {
        type: String,
        required: null,
        },

});

var Kpis = new mongoose.model('kpis', schema);

module.exports = Kpis;