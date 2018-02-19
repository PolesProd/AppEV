(function () {
  'use strict';

  angular
    .module('employes.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('employes', {
        abstract: true,
        url: '/employes',
        template: '<ui-view/>'
      })
      .state('employes.list', {
        url: '',
        templateUrl: '/modules/employes/client/views/list-employes.client.view.html',
        controller: 'EmployesListController',
        controllerAs: 'vm'
      })
      .state('employes.view', {
        url: '/:employeId',
        templateUrl: '/modules/employes/client/views/view-employe.client.view.html',
        controller: 'EmployesController',
        controllerAs: 'vm',
        resolve: {
          employeResolve: getEmploye
        },
        data: {
          pageTitle: '{{ employeResolve.title }}'
        }
      });
  }

  getEmploye.$inject = ['$stateParams', 'EmployesService'];

  function getEmploye($stateParams, EmployesService) {
    return EmployesService.get({
      employeId: $stateParams.employeId
    }).$promise;
  }
}());
