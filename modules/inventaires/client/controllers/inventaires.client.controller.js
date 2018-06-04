(function() {
  'use strict';

  angular
    .module('inventaires')
    .controller('PlanningsController', PlanningsController);

  PlanningsController.$inject = ['$scope', 'inventaireResolve', 'Authentication', 'InventairesService'];

  function PlanningsController($scope, inventaire, Authentication, InventairesService) {
    var vm = this;

    vm.inventaire = inventaire;
    vm.authentication = Authentication;
    vm.inventaires = InventairesService.query();

    // Récuperation du contenu de la collection Inventaire
    $scope.data = [];
    $scope.data = vm.inventaires;
    $scope.data.$promise.then(function(params) {
      $scope.item = [{
        modele: params.modele,
        marque: params.marque,
        quantite: params.quantite,
        status: params.status,
        lieu: params.lieu,
        type: params.type
      }];
    });
  }
}());