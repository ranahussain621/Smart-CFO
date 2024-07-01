var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true
    },
    company_id: {
        type: String,
        default: null
    },
    account_id: {
        type: String,
        default: null
    },
    financialYearstart: {
        type: String,
        default: null
    },
    financialYearend: {
        type: String,
        default: null
    }
});

var Company = new mongoose.model('companies', schema);

module.exports = Company;
