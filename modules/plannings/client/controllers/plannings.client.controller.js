(function () {
  'use strict';

  angular
    .module('plannings')
    .controller('PlanningsController', PlanningsController);

  PlanningsController.$inject = ['$scope', 'planningResolve', 'Authentication'];

  function PlanningsController($scope, planning, Authentication) {
    var vm = this;

    vm.planning = planning;
    vm.authentication = Authentication;
  }
}());
