'use strict';

angular.module('core').controller('HeaderController', ['$scope', '$state', '$location', 'Authentication', 'Menus',
function ($scope, $state, $location, Authentication, Menus) {
  // Expose view variables
  $scope.$state = $state;
  $scope.authentication = Authentication;


  // Get the topbar menu
  $scope.menu = Menus.getMenu('topbar');

  // Toggle the menu items
  $scope.isCollapsed = false;
  $scope.toggleCollapsibleMenu = function () {
    $scope.isCollapsed = !$scope.isCollapsed;
  };

  // Collapsing the menu after navigation
  $scope.$on('$stateChangeSuccess', function () {
    $scope.isCollapsed = false;
  });

  var url = '';
  url = $location.path();

  var headerStyle = document.getElementById('header');

  if (url === '/employes') {
    headerStyle.style.width = '100%';
  } else if (url === '/inventories') {
    headerStyle.style.width = '100%';
  } else if (url === '/plannings') {
    headerStyle.style.width = '100%';
  }
  console.log(url);
}
]);
