(function () {
  'use strict';

  // Teams controller
  angular
    .module('teams')
    .controller('TeamsController', TeamsController);

  TeamsController.$inject = ['$scope', '$state', '$window', '$log', 'Authentication', 'teamResolve', 'EmployesService'];

  function TeamsController ($scope, $state, $window, $log, Authentication, team, EmployesService) {
    var vm = this;

    vm.authentication = Authentication;
    vm.team = team;
    vm.error = null;
    vm.form = {};
    vm.remove = remove;
    vm.save = save;
    vm.employe = EmployesService.query();

    $scope.members = vm.employe;

    $scope.members.$promise.then(function (resourceArray) {
      $scope.item = resourceArray[0];
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
