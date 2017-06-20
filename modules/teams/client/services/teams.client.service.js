// Employes service used to communicate Employes REST endpoints
(function () {
  'use strict';

  angular
    .module('teams')
    .factory('TeamsService', TeamsService)
    .factory('TeamsService', EmployeService)

    .controller('TeamsController', ['$scope', '$resource', function ($scope, $resource) {
      // Déclaration d'une équipe
      $scope.team = {};

      // Fonction de création d'une équipe
      $scope.createTeam = function () {
        console.log($scope.team);

        // Persiste dans MongoDB
        $resource('/api/teams', null, {
          'save': {
            method: 'POST',
            isArray: false
          }
        })
        .save($scope.team).$promise.then(
          function (result) {
            console.log(result);
          },
          function (response) {
            console.log(response);
          }
        )
      }
      /* -----------------------------------------------------------------------
                                      RESSOURCE EMPLOYEES
      ------------------------------------------------------------------------*/
      $resource('/api/employes', null, {
        'get': {
          method: 'GET',
          isArray: true
        }
      })
      .get().$promise.then(
        function (employes) {
          $scope.employes = employes;
          console.log($scope.employes);
        },
        function (response) {
          console.error('error');
        }
      )
    }]);

  TeamsService.$inject = ['$resource'];
  EmployeService.$inject = ['$resource'];

  function TeamsService($resource) {
    return $resource('api/teams/:teamId', {
      employeId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }

  function EmployeService($resource) {
    return $resource('api/employes/:employeId', {
      employeId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
