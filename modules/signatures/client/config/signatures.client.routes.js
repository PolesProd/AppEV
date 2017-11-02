(function () {
  'use strict';

  angular
    .module('signatures')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('signatures', {
        abstract: true,
        url: '/signatures',
        template: '<ui-view/>'
      })
      .state('signatures.list', {
        url: '',
        templateUrl: 'modules/signatures/client/views/list-signatures.client.view.html',
        controller: 'SignaturesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Signatures List'
        }
      })
      .state('signatures.create', {
        url: '/create',
        templateUrl: 'modules/signatures/client/views/form-signature.client.view.html',
        controller: 'SignaturesController',
        controllerAs: 'vm',
        resolve: {
          signatureResolve: newSignature
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Signatures Create'
        }
      })
      .state('signatures.edit', {
        url: '/:signatureId/edit',
        templateUrl: 'modules/signatures/client/views/form-signature.client.view.html',
        controller: 'SignaturesController',
        controllerAs: 'vm',
        resolve: {
          signatureResolve: getSignature
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Signature {{ signatureResolve.name }}'
        }
      })
      .state('signatures.view', {
        url: '/:signatureId',
        templateUrl: 'modules/signatures/client/views/view-signature.client.view.html',
        controller: 'SignaturesController',
        controllerAs: 'vm',
        resolve: {
          signatureResolve: getSignature
        },
        data: {
          pageTitle: 'Signature {{ signatureResolve.name }}'
        }
      });
  }

  getSignature.$inject = ['$stateParams', 'SignaturesService'];

  function getSignature($stateParams, SignaturesService) {
    return SignaturesService.get({
      signatureId: $stateParams.signatureId
    }).$promise;
  }

  newSignature.$inject = ['SignaturesService'];

  function newSignature(SignaturesService) {
    return new SignaturesService();
  }
}());
