// Employes service used to communicate Employes REST endpoints
(function () {
  'use strict';

   angular
  .module('employes')
  .factory('EmployesService', EmployesService)
  .factory('EmployesService', TeamService)

  .controller('EmployesController', ['$scope', '$resource', function ($scope, $resource) {
    $resource('/api/teams', null, {
      'get': {
        method: 'GET',
        isArray: true
      }
    })

    .get().$promise.then(
      function(teams) {
        $scope.teams = teams;
        // console.log(teams);
      },
      function(response) {
        alert('Error');
      });

      $resource('/api/teams', {
        data: '@team'
      }, {
        'save': {
          method: 'POST'
        }
      })
      .save($scope.team).$promise.then(
        function (team) {
          $scope.teams.push(team);
          console.log('success');
        },
        function (response) {
          console.error('error');
        }
      );

      $resource('/api/teams/:teamId', {
        data: '@team'
      }, {
        'update': {
          method: 'PUT'
        }
      })
      .update({
        id: $scope.team.id
      }, $sccope.team).$promise.then(
        function (team) {
          console.log('success');
        },
        function (response) {
          console.error('error');
        }
      );
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
      create: {
        method: 'GET'
      }
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
