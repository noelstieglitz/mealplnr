var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var mealPlanModel = new Schema({
    startDate: {
        type: Date
    },
    meals: []
});

module.exports = mongoose.model('MealPlan', mealPlanModel);