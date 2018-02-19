(function () {
  'use strict';

  angular
    .module('inventaires')
    .controller('PlanningsController', PlanningsController);

  PlanningsController.$inject = ['$scope', 'inventaireResolve', 'Authentication'];

  function PlanningsController($scope, inventaire, Authentication) {
    var vm = this;

    vm.inventaire = inventaire;
    vm.authentication = Authentication;
  }
}());
