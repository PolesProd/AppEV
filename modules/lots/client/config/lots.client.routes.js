(function () {
  'use strict';

  angular
    .module('lots')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('lots', {
        abstract: true,
        url: '/lots',
        template: '<ui-view/>',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('lots.list', {
        url: '',
        templateUrl: 'modules/lots/client/views/list-lots.client.view.html',
        controller: 'LotsListController',
        controllerAs: 'vm',
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Lots List'
        }
      })
      .state('lots.create', {
        url: '/create',
        templateUrl: 'modules/lots/client/views/form-lot.client.view.html',
        controller: 'LotsController',
        controllerAs: 'vm',
        resolve: {
          lotResolve: newLot
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Lots Create'
        }
      })
      .state('lots.edit', {
        url: '/:lotId/edit',
        templateUrl: 'modules/lots/client/views/form-lot.client.view.html',
        controller: 'LotsController',
        controllerAs: 'vm',
        resolve: {
          lotResolve: getLot
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Lot {{ lotResolve.name }}'
        }
      })
      .state('lots.view', {
        url: '/:lotId',
        templateUrl: 'modules/lots/client/views/view-lot.client.view.html',
        controller: 'LotsController',
        controllerAs: 'vm',
        resolve: {
          lotResolve: getLot
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Lot {{ lotResolve.name }}'
        }
      });
  }

  getLot.$inject = ['$stateParams', 'LotsService'];

  function getLot($stateParams, LotsService) {
    return LotsService.get({
      lotId: $stateParams.lotId
    }).$promise;
  }

  newLot.$inject = ['LotsService'];

  function newLot(LotsService) {
    return new LotsService();
  }
}());
