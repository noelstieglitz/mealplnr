var recipeController = function (Recipe) {
    var post = function (req, res) {
        var recipe = new Recipe(req.body);
        console.log(recipe);

        if (!req.body.url) {
            res.status(400);
            res.send('Url is required');
        } else {
            recipe.save();
            res.status(201);
            res.send(recipe);
        }
    };


    var get = function (req, res) {
        var query = {};

        /*if(req.query.genre){
            query.genre = req.query.genre;
        }*/

        Recipe.find(query, function (err, recipes) {
            if (err) {
                res.status(500).send(err);
            } else {

                var returnRecipes = [];

                recipes.forEach(function (element, index, array) {
                    var newRecipe = element.toJSON();
                    newRecipe.links = {};
                    newRecipe.links.self = 'http://' + req.headers.host + '/api/recipes/' + newRecipe._id;
                    returnRecipes.push(newRecipe);
                });
                res.json(returnRecipes);
            }
        });
    };

    return {
        post: post,
        get: get
    };

};

module.exports = recipeController;
