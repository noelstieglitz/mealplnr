var express = require('express');

var routes = function(Recipe){

    var recipeRouter = express.Router();

    var recipeController = require('../Controllers/recipeController')(Recipe);

    recipeRouter.route('/')
        .post(recipeController.post)
        .get(recipeController.get);

    recipeRouter.use('/:recipeId', function(req, res, next){
        /*if(req.query.genre){
            query.genre = req.query.genre;
        }*/

        Recipe.findById(req.params.recipeId, function(err, recipe){
            if(err){
                res.status(500).send(err);
            } else if (recipe) {
                req.recipe = recipe;
                next();
            } else {
                res.status(404).send('no recipe found');
            }
        });
    });

    recipeRouter.route('/:recipeId')
        .get(function(req, res){
            var returnRecipe = req.recipe.toJSON();
            res.json(returnRecipe);
        }
    )
    .put(function(req, res){

/*/*TODO
    probalby should get by Id first, then populate
        recipe.url = req.body.url;
        recipe.title = req.body.title;
        recipe.prepTime = req.body.prepTime;
        recipe.cookTime = req.body.cookTime;
        recipe.totalTime = req.body.totalTime;
        recipe.includesCarb = req.body.includesCarb;
        recipe.includesVeggie = req.body.includesVeggie;
        recipe.vegetarian = req.body.vegetarian;
*/
        recipe.save(function(err){
            if(err){
                res.status(500).send(err);
            } else {
                res.json(req.recipe);
            }
        });
    })
    .patch(function(req, res){
        if(req.body._id){
            delete req.body._id;
        }
        
         Recipe.findById(req.params.recipeId, function(err, recipe){
            if(err){
                res.status(500).send(err);
            } else if (recipe._doc) {
                for(var p in req.body){
                    recipe[p] = req.body[p];
                }
                
                 recipe.save(function(err){
                    if(err){
                        res.status(500).send(err);
                    } else {
                        res.json(recipe);
                    }

                });
            } else {
                res.status(404).send('no recipe found');
            }
        });
    })
    .delete(function(req, res){
        req.recipe.remove(function(err){
            if(err){
                res.status(500).send(err);
            } else {
                res.status(204).send('Removed');
            }
        });
    });

    return recipeRouter;

};


module.exports = routes;
