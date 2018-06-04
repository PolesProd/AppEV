(function() {
  'use strict';

  angular
    .module('inventaires')
    .controller('InventairesListController', InventairesListController)
    .directive('stRatio', function() {
      return {
        link: function(scope, element, attr) {
          var ratio = +(attr.stRatio);

          element.css('width', ratio + '%');

        }
      };
    });

  InventairesListController.$inject = ['$scope', '$http', 'InventairesService', 'Authentication'];

  function InventairesListController($scope, $http, InventairesService, Authentication) {
    var vm = this;

    vm.authentication = Authentication;
    vm.inventaires = InventairesService.query();

    // Récuperation du contenu de la collection Inventaire
    $scope.datas = [];
    $scope.datas = vm.inventaires;

    $scope.datas.$promise.then(function(resourceArray) {
      // Initialise un array vide pour les data
      $scope.options = [];

      // Boucle à l'interieur de la collection Inventaire
      angular.forEach($scope.datas, function(params) {

        // Injecte la value d'un item à l'interieur de l'array 'options'
        $scope.options.push({
          modele: params.modele,
          marque: params.marque,
          quantite: params.quantite,
          status: params.status,
          lieu: params.lieu,
          type: params.type
        });
      });
      console.log($scope.options);
    });

    $scope.selectedPredicate = $scope.predicates[0];
  }
}());