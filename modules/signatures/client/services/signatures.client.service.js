// Signatures service used to communicate Signatures REST endpoints
(function () {
  'use strict';

  angular
    .module('signatures')
    .factory('SignaturesService', SignaturesService);

  SignaturesService.$inject = ['$resource'];

  function SignaturesService($resource) {
    return $resource('api/signatures/:signatureId', {
      signatureId: '@_id'
    }, {
      update: {
        method: 'PUT'
      }
    });
  }
}());
