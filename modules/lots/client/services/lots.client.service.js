// Lots service used to communicate Lots REST endpoints
(function () {
  'use strict';

  angular
    .module('lots')
    .factory('LotsService', LotsService);

  LotsService.$inject = ['$resource'];

  function LotsService($resource) {
    return $resource('api/lots/:lotId', {
      lotId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
