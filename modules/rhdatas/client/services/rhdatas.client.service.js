// Rhdatas service used to communicate Rhdatas REST endpoints
(function () {
  'use strict';

  angular
    .module('rhdatas')
    .factory('RhdatasService', RhdatasService)
    // .factory('RhdatasService', EmployesService)

    .controller('RhdatasService', ['$scope', '$resource', '$http', function ($scope, $resource, $http) {
      $scope.rhdata = {};

      $scope.createRhdata = function () {
        console.log($scope.rhdata);

        $resource('/api/rhdatas', null, {
          'save': {
            method: 'POST',
            isArray: false
          }
        })
        .save($scope.rhdata);
      };
    }]);

  RhdatasService.$inject = ['$resource'];

  function RhdatasService($resource) {
    return $resource('api/rhdatas/:rhdataId', {
      rhdataId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
