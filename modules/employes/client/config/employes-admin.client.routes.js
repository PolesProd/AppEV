(function () {
  'use strict';

  angular
    .module('employes.admin.routes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('admin.employes', {
        abstract: true,
        url: '/employes',
        template: '<ui-view/>'
      })
      .state('admin.employes.list', {
        url: '',
        templateUrl: '/modules/employes/client/views/admin/list-employes.client.view.html',
        controller: 'EmployesAdminListController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        }
      })
      .state('admin.employes.create', {
        url: '/create',
        templateUrl: '/modules/employes/client/views/admin/form-employe.client.view.html',
        controller: 'EmployesAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin']
        },
        resolve: {
          employeResolve: newEmploye
        }
      })
      .state('admin.employes.edit', {
        url: '/:employeId/edit',
        templateUrl: '/modules/employes/client/views/admin/form-employe.client.view.html',
        controller: 'EmployesAdminController',
        controllerAs: 'vm',
        data: {
          roles: ['admin'],
          pageTitle: '{{ employeResolve.title }}'
        },
        resolve: {
          employeResolve: getEmploye
        }
      });
  }

  getEmploye.$inject = ['$stateParams', 'EmployesService'];

  function getEmploye($stateParams, EmployesService) {
    return EmployesService.get({
      employeId: $stateParams.employeId
    }).$promise;
  }

  newEmploye.$inject = ['EmployesService'];

  function newEmploye(EmployesService) {
    return new EmployesService();
  }
}());
