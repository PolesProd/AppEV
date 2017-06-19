// Finances service used to communicate Finances REST endpoints
(function () {
  'use strict';

  angular
    .module('finances')
    .factory('FinancesService', FinancesService);

  FinancesService.$inject = ['$resource'];

  function FinancesService($resource) {
    return $resource('api/finances/:financeId', {
      financeId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
