// Employes service used to communicate Employes REST endpoints
'use strict';

angular.module('employes').factory('EmployesService', ['$resource',
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
]);

angular.module('employes.admin').factory('Admin', ['$resource',
  function Admin($resource) {
    return $resource('api/employes/:employeId', {
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
]);