(function(){
  'use strict';
angular.module('MealPlnr').controller('MealPlanDetailController', MealPlanDetailController);

MealPlanDetailController.$inject = ['mealPlanService', 'mealPlan'];

function MealPlanDetailController(mealPlanService, mealPlan) {
  var vm = this;
  vm.mealPlan = mealPlan;
  vm.week = moment(vm.mealPlan.startDate).format("MMMM Do YYYY");
}
})();