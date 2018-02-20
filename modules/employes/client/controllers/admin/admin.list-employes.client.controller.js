(function () {
  'use strict';

  angular
    .module('employes.admin')
    .controller('EmployesAdminListController', EmployesAdminListController);

  EmployesAdminListController.$inject = ['EmployesService'];

  function EmployesAdminListController(EmployesService) {
    var vm = this;

    vm.employes = EmployesService.query();
  }
}());
