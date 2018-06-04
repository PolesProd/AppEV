(function() {
  'use strict';

  angular
    .module('inventaires.admin')
    .controller('InventairesAdminListController', InventairesAdminListController)
    .directive('stRatio', function() {
      return {
        link: function(scope, element, attr) {
          var ratio = +(attr.stRatio);

          element.css('width', ratio + '%');

        }
      };
    });

  InventairesAdminListController.$inject = ['$scope', 'InventairesService'];

  function InventairesAdminListController($scope, InventairesService) {
    var vm = this;

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
  }
}());