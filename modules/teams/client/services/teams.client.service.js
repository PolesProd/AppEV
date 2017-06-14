// Employes service used to communicate Employes REST endpoints
(function () {
  'use strict';

   angular
  .module('teams')
  .factory('TeamsService', EmployesService)
  .factory('TeamsService', TeamsService)

  .controller('TeamsController', ['$scope', '$resource', function ($scope, $resource) {
    $resource('/api/employes/:employeId', {
      'get': {
        method: 'GET',
        isArray: true
      }
    })

    .get().$promise.then(
      function(employes) {
        $scope.employes = employes;
        // teams


        // console.log(teams);
      },
      function(response) {
        alert('Error');
      });
  }]);

  TeamsService.$inject = ['$resource'];
  EmployesService.$inject = ['$resource'];

  function TeamsService($resource) {
    return $resource('/api/teams/:teamId', {
      teamId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }

  function EmployesService($resources) {
    return $resource('/api/employes/:employeId', {
      employeId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
