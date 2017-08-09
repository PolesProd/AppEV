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



    // function headerStyle() {
    //   var url = $location.url();
    //   var header = angular.element(document.querySelector('#header'));
    //
    //   if (url !== '/teams') {
    //     headerStyle.css('width', '40%');
    //   }
    //   headerStyle.css('width', '100%');
    //   console.log(url);
    // }
  }
]);
