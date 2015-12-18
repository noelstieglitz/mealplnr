(function(){
  'use strict';

angular.module('MealPlnr')
.factory('mealPlanService', mealPlanService);

mealPlanService.$inject = ['$http'];

function mealPlanService($http) {

    var service = {
        create: create
    };
    return service;

    ////////////

    function create(date) {
        alert(date);
    }

}
})();
