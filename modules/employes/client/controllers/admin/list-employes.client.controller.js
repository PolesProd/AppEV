'use strict';

angular.module('employes.admin').controller('EmployeListController', ['$scope', '$filter', 'Admin',
	function EmployeListController($scope, $filter, Admin) {
		Admin.query(function(data) {
			$scope.employes = data;
			$scope.buildPager();
			console.log(Admin.query());
		});

		$scope.buildPager = function() {
			$scope.pagedItems = [];
			$scope.itemsPerPage = 15;
			$scope.currentPage = 1;
			$scope.figureOutItemsToDisplay();
		};

		$scope.figureOutItemsToDisplay = function() {
			$scope.filteredItems = $filter('filter')($scope.employes, {
				$: $scope.search
			});

			$scope.filterLength = $scope.filteredItems.length;

			var begin = (($scope.currentPage - 1) * $scope.itemsPerPage);
			var end = begin + $scope.itemsPerPage;

			$scope.pagedItems = $scope.filteredItems.slice(begin, end);
		};

		$scope.pageChanged = function() {
			$scope.figureOutItemsToDisplay();
		};
	}
]);