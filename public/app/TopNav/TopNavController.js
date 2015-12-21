(function () {
    'use strict';
    angular.module('MealPlnr').controller('TopNavController', TopNavController);

    TopNavController.$inject = ['$mdSidenav'];

    function TopNavController($mdSidenav) {
        var vm = this;
        vm.toggleMenu = toggleMenu;

        function toggleMenu(location) {
            $mdSidenav('left').toggle();
        }
    }
})();