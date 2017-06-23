// Employes service used to communicate Employes REST endpoints
(function () {
  'use strict';

  angular
    .module('employes')
    .factory('EmployesService', EmployesService)

    .controller('EmployesController', ['$scope', '$resource', '$http', function ($scope, $resource, $http) {

      // -- Déclaration d'un Employe
      $scope.employe = {};

      $scope.createEmploye = function() {

        console.log($scope.employe);

        // -- Persiste dans MongoDB
        $resource('/api/employes', null, {
          'save': {
            method: 'POST',
            isArray: false
          }
        })
        .save($scope.employe).$promise.then(
          function(result) {
            // $scope.employes.push(result);
            // console.log('result is:')
            console.log(result);
          },

          function(response) {
            console.log(response);
          }
        );
      };
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
          console.error(response);
        });
    }]);

  EmployesService.$inject = ['$resource'];

  function EmployesService($resource) {
    return $resource('/api/employes/:employeId', {
      employeId: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
      query: {
        method: 'GET',
        isArray: true
      }
    });
  }
}());