(function () {
  'use strict';

  angular
    .module('equipes')
    .controller('EquipesController', EquipesController);

  EquipesController.$inject = ['$scope', 'equipeResolve', 'Authentication'];

  function EquipesController($scope, equipe, Authentication) {
    var vm = this;

    vm.equipe = equipe;
    vm.authentication = Authentication;
  }
}());
