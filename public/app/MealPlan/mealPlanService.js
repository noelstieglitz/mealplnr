(function(){
  'use strict';

angular.module('MealPlnr')
.factory('mealPlanService', mealPlanService);

mealPlanService.$inject = ['$http', '$q'];

function mealPlanService($http, $q) {
    var currentMealPlan = null;
    var api = '/api/mealplans'

    var service = {
        create: create,
        getCurrent: getCurrent,
        getById: getById
    };
    return service;

    ////////////

    function create(date) {
        var promise = $q.defer();
        
       $http.post(api, {startDate: date})
            .then(function(result){
                currentMealPlan = result.data
                promise.resolve(result.data);
            });
       return promise.promise;
    }
    
    function getById(mealPlanId){
        var promise = $q.defer();
        
        $http.get(api + '/?id=' + mealPlanId).then(function(result){
            promise.resolve(result.data[0]);
        });
        
        return promise.promise;
    }
    
    function getCurrent(){
        return currentMealPlan;
    }

}
})();
