(function () {
  'use strict';

  angular
    .module('inventaires')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Inventaires',
      state: 'inventaires.list',
      type: 'item',
      roles: ['*']
    });

    // Add the dropdown list item
    // menuService.addSubMenuItem('topbar', 'inventaires', {
    //   title: 'List Inventaires',
    //   state: 'inventaires.list',
    //   roles: ['*']
    // });
  }
}());
