(function () {
  'use strict';

  angular
    .module('plannings.admin')
    .controller('PlanningsAdminListController', PlanningsAdminListController);

  PlanningsAdminListController.$inject = ['PlanningsService'];

  function PlanningsAdminListController(PlanningsService) {
    var vm = this;

    vm.plannings = PlanningsService.query();
  }
}());
