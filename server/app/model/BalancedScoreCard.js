var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    
    name: {
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
    created_at: {
        type: Date,
        default: Date.now
    }
});

var BalancedScoreCard = new mongoose.model('balancedscorecards', schema);

module.exports = BalancedScoreCard;
