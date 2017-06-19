(function () {
  'use strict';

  angular
    .module('finances')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('finances', {
        abstract: true,
        url: '/finances',
        template: '<ui-view/>'
      })
      .state('finances.list', {
        url: '',
        templateUrl: 'modules/finances/client/views/list-finances.client.view.html',
        controller: 'FinancesListController',
        controllerAs: 'vm',
        data: {
          pageTitle: 'Finances List'
        }
      })
      .state('finances.create', {
        url: '/create',
        templateUrl: 'modules/finances/client/views/form-finance.client.view.html',
        controller: 'FinancesController',
        controllerAs: 'vm',
        resolve: {
          financeResolve: newFinance
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Finances Create'
        }
      })
      .state('finances.edit', {
        url: '/:financeId/edit',
        templateUrl: 'modules/finances/client/views/form-finance.client.view.html',
        controller: 'FinancesController',
        controllerAs: 'vm',
        resolve: {
          financeResolve: getFinance
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Edit Finance {{ financeResolve.name }}'
        }
      })
      .state('finances.view', {
        url: '/:financeId',
        templateUrl: 'modules/finances/client/views/view-finance.client.view.html',
        controller: 'FinancesController',
        controllerAs: 'vm',
        resolve: {
          financeResolve: getFinance
        },
        data: {
          pageTitle: 'Finance {{ financeResolve.name }}'
        }
      });
  }

  getFinance.$inject = ['$stateParams', 'FinancesService'];

  function getFinance($stateParams, FinancesService) {
    return FinancesService.get({
      financeId: $stateParams.financeId
    }).$promise;
  }

  newFinance.$inject = ['FinancesService'];

  function newFinance(FinancesService) {
    return new FinancesService();
  }
}());
