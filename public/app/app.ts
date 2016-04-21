var app = angular.module('MealPlnr', ['ui.router', 'ngAnimate', 'ngMaterial', 'ngMdIcons']);

app.config(['$stateProvider', '$urlRouterProvider', '$mdThemingProvider', '$mdIconProvider', appConfig]);
function appConfig($stateProvider, $urlRouterProvider, $mdThemingProvider, $mdIconProvider) {
    $urlRouterProvider.otherwise('/mealplan/create');

    $stateProvider
        .state('createmealplan', {
            url: '/mealplan/create',
            templateUrl: 'app/mealplan/createmealplan.html',
            controller: 'MealPlanController',
            controllerAs: 'vm'
        })
        .state('mealplandetail', {
            url: "/mealplan/:mealPlanId",
            templateUrl: 'app/mealplan/mealplandetail.html',
            controller: 'MealPlanDetailController',
            controllerAs: 'vm',
            resolve: {
                mealPlan: ['mealPlanService', '$stateParams', function (mealPlanService, $stateParams) {
                    return mealPlanService.getById($stateParams.mealPlanId); // not then
                }]
            }
        });
     
    // 
    //  $mdThemingProvider.theme('default')
    //                   .primaryPalette('deep-purple')
    //                   .accentPalette('lime');
}

app.run(['$rootScope',function ($rootScope) {
    $rootScope.$on("$stateChangeError", console.log.bind(console));
}]);