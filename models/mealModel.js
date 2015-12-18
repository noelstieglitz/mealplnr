var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var mealModel = new Schema({
    recipe: Schema.Types.Mixed,
    veggie:{
        type: String
    },
    carb:{
        type: String
    }
});

module.exports = mongoose.model('Meal', mealModel);
