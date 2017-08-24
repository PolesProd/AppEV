(function () {
  'use strict';

  // Teams controller
  angular
  .module('teams')
  .controller('TeamsController', TeamsController);

  TeamsController.$inject = ['$scope', '$state', '$window', '$log', 'Authentication', 'teamResolve', 'EmployesService', 'LotsService'];

  function TeamsController ($scope, $state, $window, $log, Authentication, team, EmployesService, LotsService) {
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
      $scope.item = [{
        icon: '<img src="../modules/plannings/client/img/tondeuse.jpg"/>', firstname: resourceArray[0].firstname, lastname: resourceArray[0].lastname, email: resourceArray[0].email, number: resourceArray[0].number, team: resourceArray[0].team, formation: resourceArray[0].formation, contract: resourceArray[0].contract, ticked: false
      }];
    });

    $scope.sites = vm.site;
    $scope.sites.$promise.then(function (resourceArray) {
      $scope.item = [{
        id: resourceArray[0].properties.ID, label: resourceArray[0].properties.nom
      }];

      console.log($scope.item);
    });

    /*$(document).ready(function() {
      $('#site').multiselect();
    });*/

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
        $state.go('teams.view', {
          teamId: res._id
        });
      }

      function errorCallback(res) {
        vm.error = res.data.message;
      }
    }
  }
}());