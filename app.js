var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var db;

if (process.env.ENV == 'Test'){
    db = mongoose.connect('mongodb://localhost/mealPlnr_test');

} else {
    db = mongoose.connect('mongodb://localhost/mealPlnr');
}

var Recipe = require('./models/recipeModel');
var MealPlan = require('./models/mealPlanModel');
var Meal = require('./models/mealModel');

var app = express();
var port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

var recipeRouter = require('./Routes/recipeRoute')(Recipe);
var mealPlanRouter = require('./Routes/mealPlanRoute')(MealPlan, Meal, Recipe);

app.use('/api/recipes', recipeRouter);
app.use('/api/mealPlans', mealPlanRouter);
app.use('/', express.static('./public/'))
app.get('/', function(req,res){
    res.send('Welcome to MealPlnr.');
});

app.listen(port, function(){
    console.log('Running on Port: ' + port);
});

module.exports = app;
