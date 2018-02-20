(function () {
  'use strict';

  angular
    .module('inventaires.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('inventaires', {
        abstract: true,
        url: '/inventaires',
        template: '<ui-view/>'
      })
      .state('inventaires.list', {
        url: '',
        templateUrl: '/modules/inventaires/client/views/list-inventaires.client.view.html',
        controller: 'InventairesListController',
        controllerAs: 'vm'
      })
      .state('inventaires.view', {
        url: '/:inventairesId',
        templateUrl: '/modules/inventaires/client/views/view-inventaires.client.view.html',
        controller: 'InventairesController',
        controllerAs: 'vm',
        resolve: {
          inventairesResolve: getInventaire
        },
        data: {
          pageTitle: '{{ inventairesResolve.title }}'
        }
      });
  }

  getInventaire.$inject = ['$stateParams', 'InventairesService'];

  function getInventaire($stateParams, InventairesService) {
    return InventairesService.get({
      inventairesId: $stateParams.inventairesId
    }).$promise;
  }
}());
