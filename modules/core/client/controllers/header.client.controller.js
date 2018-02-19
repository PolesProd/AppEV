(function () {
  'use strict';

  angular
    .module('core')
    .controller('HeaderController', HeaderController);

  HeaderController.$inject = ['$scope', '$state', '$location', 'Authentication', 'menuService'];

  function HeaderController($scope, $state, $location, Authentication, menuService) {
    var vm = this;

    vm.accountMenu = menuService.getMenu('account').items[0];
    vm.authentication = Authentication;
    vm.isCollapsed = false;
    vm.menu = menuService.getMenu('topbar');

    $scope.$on('$stateChangeSuccess', stateChangeSuccess);

    function stateChangeSuccess() {
      // Collapsing the menu after navigation
      vm.isCollapsed = false;
    }

    var url = '';
    url = $location.path();

    var headerStyle = document.getElementById('header');

    if (url === '/employes/') {
      headerStyle.style.width = '100%';
    } else if (url === '/inventories/') {
      headerStyle.style.width = '100%';
    } else if (url === '/plannings/') {
      headerStyle.style.width = '100%';
    }
  }
}());
