(function () {
  'use strict';

  angular
    .module('sites')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Sites',
      state: 'sites.list',
      type: 'item',
      roles: ['*']
    });

    // Add the dropdown list item
    // menuService.addSubMenuItem('topbar', 'sites', {
    //   title: 'List Sites',
    //   state: 'sites.list',
    //   roles: ['*']
    // });
  }
}());
