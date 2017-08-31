(function () {
  'use strict';

  // Teams controller
  angular
  .module('teams')
  .controller('TeamsController', TeamsController);

  TeamsController.$inject = ['$scope', '$state', '$http', '$sce', '$window', '$log', 'Authentication', 'teamResolve', 'EmployesService', 'LotsService'];

  function TeamsController ($scope, $state, $http, $sce, $window, $log, Authentication, team, EmployesService, LotsService) {
    var vm = this;

    vm.authentication = Authentication;
    vm.team = team;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.employe = EmployesService.query();
    vm.site = LotsService.query();

    $scope.members = vm.employe;
    $scope.members.$promise.then(function (resourceArray) {
      $scope.items = [];
      angular.forEach($scope.members, function(data) {
        $scope.items.push({
          id: data._id,
          nom: data.lastname,
          prenom: data.firstname
        });
      });
    });

    $scope.sites = vm.site;
    $scope.sites.$promise.then(function (resourceArray) {
      $scope.options = [];
      angular.forEach($scope.sites, function(data) {
        $scope.options.push(
          {
            id: data.properties.ID,
            name: data.properties.nom
          }
        );
      });
    });

    $scope.labels = {
      itemsSelected: 'sélectionné(s)',
      search: 'Chercher...',
      select: 'Sélectionner',
      selectAll: 'Tout sélectionner',
      unselectAll: 'Tout déselectionner'
    };

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