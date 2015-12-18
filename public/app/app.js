var app = angular.module('MealPlnr', [ 'ui.router', 'ngAnimate', 'ngMaterial']);

app.config(['$stateProvider', '$urlRouterProvider', routeFunction]);

app.run(function($rootScope) {
  $rootScope.$on("$stateChangeError", console.log.bind(console));
});


function routeFunction($stateProvider, $urlRouterProvider){
	$urlRouterProvider.otherwise('/mealplan/create');

	$stateProvider
		.state('createmealplan', {
			url: '/mealplan/create',
			templateUrl: 'partials/createmealplan.html',
			controller: 'MealPlanController',
			controllerAs: 'vm'
		})
		.state('mealplandetail', {
        	url: "/mealplan/:mealPlanId",
			templateUrl: 'partials/mealplandetail.html',
			controller: 'MealPlanDetailController',
			controllerAs: 'vm'
    	});
}