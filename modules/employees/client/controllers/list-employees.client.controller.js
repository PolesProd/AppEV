(function () {
  'use strict';

  angular
    .module('employees')
    .controller('EmployeesListController', EmployeesListController);

  EmployeesListController.$inject = ['EmployeesService', 'TeamsService'];

  function EmployeesListController(EmployeesService, TeamsService) {
    var vm = this;

    vm.employees = EmployeesService.query();
  }
}());
