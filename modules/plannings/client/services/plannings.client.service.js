// Plannings service used to communicate Plannings REST endpoints
(function () {
  'use strict';

  angular
    .module('plannings')
    .factory('PlanningsService', PlanningsService)
    .factory('PlanningsService', TeamService)

    .controller('PlanningsController', ['$scope', '$resource', '$http', function ($scope, $resource, $http) {

      // -- Déclaration d'un planning
      $scope.planning = {};

      $scope.createPlanning = function() {

        // -- Vérification
        // console.log('executed')
        // console.log(isValid)
        console.log($scope.planning);

        // -- Persiste dans MongoDB
        $resource('/api/plannings', null, {
          'save': {
            method: 'POST',
            isArray: false
          }
        })
        .save($scope.planning).$promise.then(
          function(result) {
            // $scope.plannings.push(result);
            // console.log('result is:')
            console.log(result);
          },

          function(response) {
            console.log(response);
          });
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

  PlanningsService.$inject = ['$resource'];
  TeamService.$inject = ['$resource'];

  function PlanningsService($resource) {
    return $resource('/api/plannings/:planningId', {
      planningId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }

  function TeamService($resource) {
    return $resource('/api/teams/:teamId', {
      teamId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
