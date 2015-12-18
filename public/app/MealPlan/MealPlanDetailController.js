(function(){
  'use strict';
angular.module('MealPlnr').controller('MealPlanDetailController', MealPlanDetailController);

MealPlanDetailController.$inject = ['mealPlanService'];

function MealPlanDetailController(mealPlanService) {
  var vm = this;
  vm.week = "December 28th, 2015";
}
})();