(function () {
  'use strict';

  angular
    .module('employes')
    .config(routeConfig);

  routeConfig.$inject = ['$stateProvider'];

  function routeConfig($stateProvider) {
    $stateProvider
      .state('employes', {
        abstract: true,
        url: '/employes',
        template: '<ui-view/>',
        data: {
          roles: ['user', 'admin']
        }
      })
      .state('employes.list', {
        url: '',
        templateUrl: 'modules/employes/client/views/list-employes.client.view.html',
        controller: 'EmployesListController',
        controllerAs: 'vm',
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Employes List'
        }
      })
      .state('employes.create', {
        url: '/create',
        templateUrl: 'modules/employes/client/views/form-employe.client.view.html',
        controller: 'EmployesController',
        controllerAs: 'vm',
        resolve: {
          employeResolve: newEmploye
        },
        data: {
          roles: ['admin'],
          pageTitle: 'Employes Create'
        }
      })
      .state('employes.edit', {
        url: '/:employeId/edit',
        templateUrl: 'modules/employes/client/views/form-employe.client.view.html',
        controller: 'EmployesController',
        controllerAs: 'vm',
        resolve: {
          employeResolve: getEmploye
        },
        data: {
          roles: ['admin'],
          pageTitle: 'Edit Employe {{ employeResolve.name }}'
        }
      })
      .state('employes.view', {
        url: '/:employeId',
        templateUrl: 'modules/employes/client/views/view-employe.client.view.html',
        controller: 'EmployesController',
        controllerAs: 'vm',
        resolve: {
          employeResolve: getEmploye
        },
        data: {
          roles: ['user', 'admin'],
          pageTitle: 'Employe {{ employeResolve.name }}'
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
