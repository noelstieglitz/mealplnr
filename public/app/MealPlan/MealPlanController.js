angular.module('MealPlnr').controller('MealPlanController', MealPlanController);

MealPlanController.$inject = ['mealPlanService'];

function MealPlanController(mealPlanService) {
  var vm = this;
  vm.mealPlanDate = nextSunday();
  vm.onlySunday = onlySunday;
  vm.createMealPlan = createMealPlan;

  function onlySunday(date) {
    var day = date.getDay();
    return day === 0;
  }

  function createMealPlan() {
    mealPlanService.create(vm.mealPlanDate).then(
      function(mealPlan){
        mealPlan.data._id
      });
  }

  function nextSunday() {
    var d = new Date();
    var returnDate = new Date();
    returnDate.setDate(d.getDate() + (0 + (7 - d.getDay())) % 7);
    return returnDate;
  }
}