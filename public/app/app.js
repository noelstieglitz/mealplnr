var app = angular.module('MealPlnr', [ 'ui.router', 'ngAnimate', 'ngMaterial', 'ngMdIcons']);

app.config(['$stateProvider', '$urlRouterProvider', '$mdThemingProvider', '$mdIconProvider', appConfig]);

app.run(function($rootScope) {
  $rootScope.$on("$stateChangeError", console.log.bind(console));
});


function appConfig($stateProvider, $urlRouterProvider, $mdThemingProvider, $mdIconProvider){
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
			controllerAs: 'vm',
            resolve: {
                mealPlan: ['mealPlanService', '$stateParams', function (mealPlanService, $stateParams) {
                return mealPlanService.getById($stateParams.mealPlanId); // not then
                }]
            }
    	})
        .state('sidenav', {
            url: '/sidenav',
            controller: 'SideNavController',
            controllerAs: 'vm',
            templateUrl: 'partials/sidenav.html'
        });
        // 
        //  $mdThemingProvider.theme('default')
        //                   .primaryPalette('deep-purple')
        //                   .accentPalette('lime');
}