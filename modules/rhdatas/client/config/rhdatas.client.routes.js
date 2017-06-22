(function () {
  'use strict';

  angular
    .module('rhdatas')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('rhdatas', {
        abstract: true,
        url: '/rhdatas',
        template: '<ui-view/>'
      })
      .state('rhdatas.list', {
        url: '',
        templateUrl: 'modules/rhdatas/client/views/list-rhdatas.client.view.html',
        controller: 'RhdatasListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Rhdatas List'
        }
      })
      .state('rhdatas.create', {
        url: '/create',
        templateUrl: 'modules/rhdatas/client/views/form-rhdata.client.view.html',
        controller: 'RhdatasController',
        controllerAs: 'vm',
        resolve: {
          rhdataResolve: newRhdata
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Rhdatas Create'
        }
      })
      .state('rhdatas.edit', {
        url: '/:rhdataId/edit',
        templateUrl: 'modules/rhdatas/client/views/form-rhdata.client.view.html',
        controller: 'RhdatasController',
        controllerAs: 'vm',
        resolve: {
          rhdataResolve: getRhdata
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Rhdata {{ rhdataResolve.name }}'
        }
      })
      .state('rhdatas.view', {
        url: '/:rhdataId',
        templateUrl: 'modules/rhdatas/client/views/view-rhdata.client.view.html',
        controller: 'RhdatasController',
        controllerAs: 'vm',
        resolve: {
          rhdataResolve: getRhdata
        },
        data: {
          pageTitle: 'Rhdata {{ rhdataResolve.name }}'
        }
      });
  }

  getRhdata.$inject = ['$stateParams', 'RhdatasService'];

  function getRhdata($stateParams, RhdatasService) {
    return RhdatasService.get({
      rhdataId: $stateParams.rhdataId
    }).$promise;
  }

  newRhdata.$inject = ['RhdatasService'];

  function newRhdata(RhdatasService) {
    return new RhdatasService();
  }
}());
