var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    totalsale: {
        type: String,
        default: null,
    },
    invoices: {
        type: String,
        default: null,
    },
    totalemplyee: {
        type: String,
        default: null,
    },
    leaves: {
        type: String,
        default: null,
    },
    company_id: {
        type: String,
        default: null
    },


});

var excelData = new mongoose.model('exceldatas', schema);

module.exports = excelData;