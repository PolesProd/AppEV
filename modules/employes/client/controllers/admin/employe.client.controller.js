'use strict';

angular
	.module('employes.admin')
	.controller('EmployeController', ['$scope', '$state', 'Authentication', 'employeResolve',
		function EmployeController($scope, $state, Authentication, employeResolve) {
			$scope.authentication = Authentication;
			$scope.employe = employeResolve;

			$scope.remove = function(employe) {
				if (confirm('Êtes-vous sur de supprimer cet employé?')) {
					if (employe) {
						employe.$remove();

						$scope.employes.splice($scope.employes.indexOf(employe), 1);
					} else {
						$scope.employe.$remove(function() {
							$state.go('admin.employes');
						});
					}
				}
			};

			$scope.update = function(isValid) {
				if (!isValid) {
					$scope.$broadcast('show-errors-check-validity', 'employeForm');

					return false;
				}

				var employe = $scope.employe;

				employe.$update(function() {
					$state.go('admin.employe', {
						employeId: employe._id
					});
				}, function(errorResponse) {
					$scope.error = errorResponse.data.message;
				});
			};
		}
	]);