var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },

});

var ScenerioPlaningGoals = new mongoose.model('scenerioplaningsgoals', schema);

module.exports = ScenerioPlaningGoals;