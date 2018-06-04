(function() {
  'use strict';

  angular
    .module('equipes')
    .controller('EquipesController', EquipesController);

  EquipesController.$inject = ['$scope', '$state', '$window', 'equipeResolve', 'Authentication', 'EmployesService', 'SitesService'];

  function EquipesController($scope, $state, $window, equipe, Authentication, EmployesService, SitesService) {
    var vm = this;

    vm.equipe = equipe;
    vm.authentication = Authentication;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.employe = EmployesService.query();
    vm.site = SitesService.query();

    $scope.members = vm.employe;
    $scope.members.$promise.then(function(resourceArray) {
      $scope.items = [];
      angular.forEach($scope.members, function(data) {
        $scope.items.push({
          id: data._id,
          nom: data.lastname,
          prenom: data.firstname,
          numero: data.number
        });
      });
    });

    $scope.sites = vm.site;
    $scope.sites.$promise.then(function(resourceArray) {
      $scope.options = [];
      angular.forEach($scope.sites, function(data) {
        $scope.options.push({
          id: data.properties.ID,
          name: data.properties.nom
        });
      });
    });

    // Remove existing Team
    function remove() {
      if ($window.confirm('Etes-vous sûr que vous voulez supprimer?')) {
        vm.team.$remove($state.go('teams.list'));
      }
    }

    // Save Team
    function save(isValid) {
      if (!isValid) {
        $scope.$broadcast('show-errors-check-validity', 'vm.form.teamForm');
        return false;
      }

      // TODO: move create/update logic to service
      if (vm.team._id) {
        vm.team.$update(successCallback, errorCallback);
      } else {
        vm.team.$save(successCallback, errorCallback);
      }

      function successCallback(res) {
        $state.go('teams.list', {
          teamId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());