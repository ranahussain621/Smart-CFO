var mongoose = require('mongoose');

var schema = new mongoose.Schema({
    plan_id: {
        type: String,
        required: true,
    },
    scenerio_goal_id: {
        type: String,
        required: true,
    },

});

var PlanGoals = new mongoose.model('plangoals', schema);

module.exports = PlanGoals;