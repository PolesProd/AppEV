// Employes service used to communicate Employes REST endpoints
(function () {
  'use strict';

   angular
    .module('teams')
    .factory('TeamsService', TeamsService)
    .factory('TeamsService', EmployeService)

    .controller('TeamsController', ['$scope', '$resource', function ($scope, $resource) {
     $resource('/api/employes/:employeId', null, {
       'get': {
         method: 'GET',
         isArray: true
       }
     })
     .get().$promise.then(
      function(employes) {
        $scope.employes = employes;
        // console.log(employes);
      },
      function(response) {
        alert('Error');
      });

      $scope.addEmploye = function() {
        $resource('/api/employes', {
          data: '@employe'
        }, {
          'save': {
            method: 'POST'
          }
        })
        .save($scope.employes).$promise.then(
          function (employe) {
            $scope.name = {};
            $scope.employes.push(employe);

            console.log('success');
            return employe;
          },
          function (response) {
            console.error('error');
          }
        );
      };

      $scope.updateEmploye = function() {
        $resource('/api/employes/:employeId', {
          data: '@employe'
        }, {
          'update': {
            method: 'PUT'
          }
        })
        .update({
          id: $scope.employes._id
        }, $scope.employe).$promise.then(
          function (employe) {
            console.log('success');
          },
          function (response) {
            console.error('error');
          }
        );
      };
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
