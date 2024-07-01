var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    company_id: {
        type: String,
        default: null
    },


});

var CFO = new mongoose.model('cfos', schema);

module.exports = CFO;