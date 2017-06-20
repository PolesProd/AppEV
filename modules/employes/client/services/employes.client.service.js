// Employes service used to communicate Employes REST endpoints
(function () {
  'use strict';

  angular
    .module('employes')
    .factory('EmployesService', EmployesService)
    .factory('EmployesService', TeamService)

    .controller('EmployesController', ['$scope', '$resource', '$http', function ($scope, $resource, $http) {

      // -- Déclaration d'un Employee
      $scope.employee = {};

      $scope.createEmployee = function() {

        // -- Vérification
        // console.log('executed')
        // console.log(isValid)
        console.log($scope.employee)

        // -- Persiste dans MongoDB
        $resource('/api/employes/', null, {
          'save': {
            method: 'POST',
            isArray: false
          }
        })
        .save($scope.employee).$promise.then(
          function(result) {
            // $scope.employes.push(result);
            // console.log('result is:')
            console.log(result);
          },

          function(response) {
            console.log(response);
          });
      }
      /* -----------------------------------------------------------------------
                                      RESSOURCE TEAMS
      ------------------------------------------------------------------------ */
      $resource('/api/teams', null, {
        'get': {
          method: 'GET',
          isArray: true
        }
      })
      .get().$promise.then(
        function(teams) {
          $scope.teams = teams;
          console.log($scope.teams);
        },

        function(response) {
          console.error('error');
        });
    }]);

  EmployesService.$inject = ['$resource'];
  TeamService.$inject = ['$resource'];

  function EmployesService($resource) {
    return $resource('api/employes/:employeId', {
      employeId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }

  function TeamService($resource) {
    return $resource('api/teams/:teamsId', {
      teamId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
