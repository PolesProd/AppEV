'use strict';

// Paramétrage des routes
angular.module('employes.admin.routes').config(['$stateProvider',
	function($stateProvider) {
		$stateProvider
			.state('admin.employes', {
				url: '/employes',
				templateUrl: 'modules/employes/client/views/admin/list-employe.client.view.html',
				controller: 'EmployeListController'
			})
			.state('admin.employe', {
				url: '/employes/:employeId',
				templateUrl: 'modules/employes/client/views/admin/view-employe.client.view.html',
				controller: 'EmployeController',
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
				controller: 'EmployeController',
				resolve: {
					employeResolve: ['$stateParams', 'Admin', function($stateParams, Admin) {
						return Admin.get({
							employeId: $stateParams.employeId
						});
					}]
				}
			});
	}
]);