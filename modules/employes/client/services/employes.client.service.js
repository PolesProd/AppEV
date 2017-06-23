// Employes service used to communicate Employes REST endpoints
(function () {
  'use strict';

  angular
    .module('employes')
    .factory('EmployesService', EmployesService)
    /*.factory('EmployesService', TeamService)*/

    .controller('EmployesController', ['$scope', '$resource', '$http', function ($scope, $resource, $http) {

      // -- Déclaration d'un Employe
      $scope.employe = {};

      $scope.createEmploye = function() {

        // -- Vérification
        // console.log('executed')
        // console.log(isValid)
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
        /*.get($scope.employe).$promise.then(
          function(result) {
            find: function(id) {
              return $scope.employe.query({ id: id });
            }
          }
        );*/
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
  /*TeamService.$inject = ['$resource'];*/

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

  /*function TeamService($resource) {
    return $resource('/api/teams/:teamId', {
      teamId: '@_id'
    }, {
      update: {
        method: 'PUT'
      },
      query: {
        method: 'GET',
        isArray: false
      }
    });
  }*/
}());