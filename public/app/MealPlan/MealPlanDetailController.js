(function(){
  'use strict';
angular.module('MealPlnr').controller('MealPlanDetailController', MealPlanDetailController);

MealPlanDetailController.$inject = ['mealPlanService', 'mealPlan'];

function MealPlanDetailController(mealPlanService, mealPlan) {
  var vm = this;
  vm.meals = mealPlan.meals;
  vm.week = moment(mealPlan.startDate).format("MMMM Do YYYY");
}
})();