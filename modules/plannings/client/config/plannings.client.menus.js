(function () {
  'use strict';

  angular
    .module('plannings')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Plannings',
      state: 'plannings.list',
      type: 'item',
      roles: ['*']
    });

    // Add the dropdown list item
    /*menuService.addSubMenuItem('topbar', 'plannings', {
      title: 'Plannings',
      state: 'plannings.list',
      roles: ['*']
    });*/
  }
}());
