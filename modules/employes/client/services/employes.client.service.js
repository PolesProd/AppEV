// Employes service used to communicate Employes REST endpoints
(function () {
  'use strict';

  angular
    .module('employes')
    .factory('EmployesService', EmployesService);

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
