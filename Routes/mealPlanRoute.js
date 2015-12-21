var express = require('express');

var routes = function (MealPlan, Meal, Recipe) {

    var mealPlanRouter = express.Router();

    var mealPlanController = require('../Controllers/mealPlanController')(MealPlan, Meal, Recipe);

    mealPlanRouter.route('/')
        .post(mealPlanController.post)
        .get(mealPlanController.get);

    mealPlanRouter.use('/:mealPlanId', function (req, res, next) {
        /*if(req.query.genre){
            query.genre = req.query.genre;
        }*/

        MealPlan.findById(req.params.mealPlanId).populate('recipe').exec(function (err, mealPlan) {
            if (err) {
                res.status(500).send(err);
            } else if (mealPlan) {
                req.mealPlan = mealPlan;
                next();
            } else {
                res.status(404).send('no mealPlan found');
            }
        });
    });

    mealPlanRouter.route('/:mealPlanId')
        .get(function (req, res) {
            var returnMealPlan = req.mealPlan.toJSON();
            res.json(returnMealPlan);
        }
            )
        .put(function (req, res) {
            /*TODO
                probalby should get by Id first, then populate
                    mealPlan.url = req.body.url;
                    mealPlan.title = req.body.title;
                    mealPlan.prepTime = req.body.prepTime;
                    mealPlan.cookTime = req.body.cookTime;
                    mealPlan.totalTime = req.body.totalTime;
                    mealPlan.includesCarb = req.body.includesCarb;
                    mealPlan.includesVeggie = req.body.includesVeggie;
                    mealPlan.vegetarian = req.body.vegetarian;
                    */

            mealPlan.save(function (err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(req.mealPlan);
                }
            });
        })
        .patch(function (req, res) {
            if (req.body._id) {
                delete req.body._id;
            }

            for (var p in req.body) {
                req.mealPlan[p] = req.body[p];
            }

            req.mealPlan.save(function (err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.json(req.mealPlan);
                }

            });

        })
        .delete(function (req, res) {
            req.mealPlan.remove(function (err) {
                if (err) {
                    res.status(500).send(err);
                } else {
                    res.status(204).send('Removed');
                }
            });
        });

    return mealPlanRouter;

};


module.exports = routes;
