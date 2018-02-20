(function () {
  'use strict';

  angular
    .module('equipes.admin')
    .controller('EquipesAdminListController', EquipesAdminListController);

  EquipesAdminListController.$inject = ['EquipesService'];

  function EquipesAdminListController(EquipesService) {
    var vm = this;

    vm.equipes = EquipesService.query();
  }
}());
