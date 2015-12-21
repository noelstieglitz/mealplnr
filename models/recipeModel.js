var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var recipeModel = new Schema({
    url: {
        type: String
    },
    title: {
        type: String
    },
    prepTime: {
        type: Number
    },
    cookTime: {
        type: Number
    },
    totalTime: {
        type: Number
    },
    includesCarb: {
        type: Boolean,
        default: false
    },
    includesVeggie: {
        type: Boolean,
        default: false
    },
    vegetarian: {
        type: Boolean,
        default: false
    },
    image: {
        type: String
    }
});

module.exports = mongoose.model('Recipe', recipeModel);
