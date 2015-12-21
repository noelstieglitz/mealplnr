angular.module('MealPlnr').controller('MealPlanController', MealPlanController);

MealPlanController.$inject = ['mealPlanService', '$state'];

function MealPlanController(mealPlanService, $state) {
    var vm = this;
    vm.mealPlanDate = nextSunday();
    vm.onlySunday = onlySunday;
    vm.createMealPlan = createMealPlan;

    function createMealPlan() {
        mealPlanService.create(vm.mealPlanDate).then(
            function (mealPlan) {
                $state.go("mealplandetail", { mealPlanId: mealPlan._id })
            });
    }

    function onlySunday(date) {
        var day = date.getDay();
        return day === 0;
    }

    function nextSunday() {
        var d = new Date();
        var returnDate = new Date();
        returnDate.setDate(d.getDate() + (0 + (7 - d.getDay())) % 7);
        return returnDate;
    }
}