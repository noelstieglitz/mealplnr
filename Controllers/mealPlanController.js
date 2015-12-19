var _ = require('lodash');
var mongoose = require('mongoose');

var mealPlanController = function(MealPlan, Meal, Recipe){
    var post = function(req, res){

        console.log(req.body);

        if(!req.body.startDate){
            res.status(400);
            res.send('Start date is required');
        } else {
            var mealPlan = new MealPlan();
            mealPlan.startDate = req.body.startDate;
            generateMealPlan(function(results){
                mealPlan.meals = results;
                mealPlan.save();
                res.status(201);
                res.send(mealPlan);
            });
        }
    };


    var get = function(req, res){
        var query = {};
        console.log(req.query);
        
        if(req.query.id){
            query._id = req.query.id;
        }

        /*if(req.query.genre){
            query.genre = req.query.genre;
        }*/

        MealPlan.find(query, function(err, mealPlans){
            if(err){
                res.status(500).send(err);
            } else {

                var returnMealPlans = [];

                mealPlans.forEach(function(element, index, array){
                    var newMealPlan = element.toJSON();
                    newMealPlan.links = {};
                    newMealPlan.links.self =  'http://' + req.headers.host + '/api/mealPlans/' + newMealPlan._id;
                    returnMealPlans.push(newMealPlan);
                });
                res.json(returnMealPlans);
            }
        }).populate('recipe');
    };

    function generateMealPlan(cb) {
      Recipe.aggregate(
            { $sample: { size: 3 } }
        , function (err, data) {
            if (err) {
                console.log(err);
                return;
            }
            var meals = [];
            var veggies = getVeggies();
            var carbs = getCarbs();
            
            _.forEach(data, function(recipe, i){
                meals[i] = {
                    recipe: recipe
                    };
                    if(!recipe.includesVeggie)
                        meals[i].veggie = veggies[i];
                    if(!recipe.includesCarb)
                        meals[i].carb =  carbs[i];
            });
            
            cb(meals)
        });
    }
    
    function getVeggies(){
        var allVeggies= [
            "Salad",
            "Green Beans",
            "Peas",
            "Lima Beans"
        ];
        
        return _.sample(allVeggies, 3);
    }
    function getCarbs(){
        var allCarbs = [
            "Sweet Potatoes",
            "Baked Potatoes",
            "Quinoa",
            "Brown Rice"
        ];
        return _.sample(allCarbs, 3);
    }
    
    return {
        post: post,
        get: get
    };

};

module.exports = mealPlanController;
