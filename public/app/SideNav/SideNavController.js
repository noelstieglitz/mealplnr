(function(){
  'use strict';
angular.module('MealPlnr').controller('SideNavController', SideNavController);

SideNavController.$inject = ['$state'];

function SideNavController($state) {
  var vm = this;
  vm.goTo = goTo;
  
  function goTo(location){
      $state.go(location);
  }
}
})();