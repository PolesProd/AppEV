(function () {
  'use strict';

  angular
    .module('employes')
    .controller('EmployesController', EmployesController);

  EmployesController.$inject = ['$scope', 'employeResolve', 'Authentication'];

  function EmployesController($scope, employe, Authentication) {
    var vm = this;

    vm.employe = employe;
    vm.authentication = Authentication;

    vm.disabled = undefined;

    vm.disable = function() {
      vm.disabled = true;
    };

    $scope.types = [
      { name: 'CDI', value: false },
      { name: 'CDD', value: false },
      { name: 'CDDI', value: false },
      { name: 'Renouvelé', value: false },
      { name: 'Licencié', value: false }
    ];

    $scope.responsables = [
      { name: 'Hamid MOUHOUB' },
      { name: 'Marie DEMARSAC' },
      { name: 'Mustafa MALKI' }
    ];
  }
}());
