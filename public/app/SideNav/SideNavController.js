(function () {
    'use strict';
    angular.module('MealPlnr').controller('SideNavController', SideNavController);

    SideNavController.$inject = ['$state', '$mdSidenav'];

    function SideNavController($state, $mdSidenav) {
        var vm = this;
        vm.goTo = goTo;

        function goTo(location) {
            $state.go(location);
            $mdSidenav('left').toggle();
        }
    }
})();