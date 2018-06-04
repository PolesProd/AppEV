(function() {
  'use strict';

  angular
    .module('inventaires.admin')
    .controller('InventairesAdminController', InventairesAdminController);

  InventairesAdminController.$inject = ['$scope', '$state', '$window', 'inventaireResolve', 'Authentication', 'Notification', 'InventairesService'];

  function InventairesAdminController($scope, $state, $window, inventaire, Authentication, Notification, InventairesService) {
    var vm = this;

    vm.inventaire = inventaire;
    vm.authentication = Authentication;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.inventaires = InventairesService.query();

    // Remove existing Inventaire
    function remove() {
      if ($window.confirm('Are you sure you want to delete?')) {
        vm.inventaire.$remove(function() {
          $state.go('admin.inventaires.list');
          Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Inventaire deleted successfully!' });
        });
      }
    }

    // Save Inventaire
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.inventaireForm');
        return false;
      }

      // Create a new inventaire, or update the current instance
      vm.inventaire.createOrUpdate()
        .then(successCallback)
        .catch(errorCallback);

      function successCallback(res) {
        $state.go('admin.inventaires.list'); // should we send the User to the list or the updated Inventaire's view?
        Notification.success({ message: '<i class="glyphicon glyphicon-ok"></i> Inventaire saved successfully!' });
      }

      function errorCallback(res) {
        Notification.error({ message: res.data.message, title: '<i class="glyphicon glyphicon-remove"></i> Inventaire save error!' });
      }
    }

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

    // Paramétrage des types
    $scope.types = [
      { name: 'Machines' },
      { name: 'Outillages' },
      { name: 'Équipements' },
      { name: 'Consommables' }
    ];
  }
}());