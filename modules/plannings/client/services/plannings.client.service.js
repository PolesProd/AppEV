// Plannings service used to communicate Plannings REST endpoints
(function () {
  'use strict';

  angular
    .module('plannings')
    .factory('PlanningsService', PlanningsService)
    .factory('PlanningsService', TeamsService)

    .controller('PlanningsController', ['$scope', '$resource', '$http', function ($scope, $resource, $http) {
      // Déclaration d'un planning
      $scope.planning = {};

      $scope.createPlanning = function () {

        console.log($scope.planning);

        // Pesistance dans MongoDB
        $resource('/api/plannings', null, {
          'save': {
            method: 'POST',
            isArray: false
          }
        })
        .save($scope.planning).$promise.then(
          function (result) {
            console.log(result);
          },
          function (response) {
            console.log(response);
          }
        );
        /* -----------------------------------------------------------------------
                                        RESSOURCE TEAMS
        ------------------------------------------------------------------------*/
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
      };
    }]);

  PlanningsService.$inject = ['$resource'];
  TeamsService.$inject = ['$resource'];

  function PlanningsService($resource) {
    return $resource('/api/plannings/:planningId', {
      planningId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }

  function TeamsService($resource) {
    return $resource('/api/teams/:teamsId', {
      teamId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
