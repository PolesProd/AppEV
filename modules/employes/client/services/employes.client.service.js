// Employes service used to communicate Employes REST endpoints
(function () {
  'use strict';

   var app = angular
  .module('employes')
  .factory('EmployesService', EmployesService)
  .factory('EmployesService', TeamService)
  .controller('EmployesController', ['$scope', '$resource', function ($scope, $resource) {
    $resource('/api/teams/:teamId', null, {
      'get': {
        method: 'GET',
        isArray: true
      }
    })
    .get().$promise.then(
      function(teams) {
        $scope.teams = teams;
      },
      function(response) {
        alert('Error');
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
      employeId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
