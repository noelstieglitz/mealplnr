(function () {
    'use strict';
    angular.module('MealPlnr').controller('MealPlanDetailController', MealPlanDetailController);

    MealPlanDetailController.$inject = ['mealPlanService', 'mealPlan'];

    function MealPlanDetailController(mealPlanService, mealPlan) {
        var vm = this;
        vm.meals = [];
        angular.forEach(mealPlan.meals, function(m, i){
            this[i] = m;
            if(m.veggie && m.carb){
                this[i].servedWithText = "Served with " + m.veggie + " and " + m.carb;
            }
            else if(m.veggie || m.carb){
                this[i].servedWithText = "Served with " + (m.veggie || m.carb);
            }
        }, vm.meals);
        vm.week = moment(mealPlan.startDate).format("MMMM Do YYYY");
    }
})();