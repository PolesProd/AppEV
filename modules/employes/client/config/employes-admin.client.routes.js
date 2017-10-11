/*'use strict';

angular
	.module('employe.admin.routes')
	.config(['$stateProvider',
		function($stateProvider) {
			$stateProvider
				.state('admin.employes', {
					url: '/employes',
					templateUrl: 'modules/employes/client/views/admin/list-employes.client.view.html',
					controller: 'EmployesListController'
				})
				.state('admin.employe', {
					url: '/employes/:employeId',
					templateUrl: 'modules/employes/client/views/admin/view-employe.client.view.html',
					controller: 'EmployesController',
					resolve: {
						employeResolve: ['$stateParams', 'Admin', function($stateParams, Admin) {
							return Admin.get({
								employeId: $stateParams.employeId
							});
						}]
					}
				})
				.state('admin.employe-edit', {
					url: '/employes/:employeId/edit',
					templateUrl: 'modules/employes/client/views/admin/edit-employe.client.view.html',
					controller: 'EmployesController',
					resolve: {
						employeResolve: ['$stateParams', 'Admin', function($stateParams, Admin) {
							return Admin.get({
								employeId: $stateParams.employeId
							});
						}]
					}
				});
		}
	])*/