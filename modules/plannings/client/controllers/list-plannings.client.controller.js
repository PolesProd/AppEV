(function () {
  'use strict';

  angular
    .module('plannings')
    .controller('PlanningsListController', PlanningsListController);

  PlanningsListController.$inject = ['PlanningsService'];

  function PlanningsListController(PlanningsService) {
    var vm = this;

    vm.plannings = PlanningsService.query();
  }
}());
