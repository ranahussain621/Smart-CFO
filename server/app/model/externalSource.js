var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    dataSource: {
        type: String,
        required: true
    },
    clientId: {
        type: String,
        required: true
    },

    clientSecret: {
        type: String,
        required: true
    },
    environment: {
        type: String,
        required: true
    },
    realmeId: {
        type: String,
    },
    accessToken: {
        type: String,
    },

    company_id: {
        type: String,
    },

});

var externalSource = new mongoose.model('externalsources', schema);

module.exports = externalSource;