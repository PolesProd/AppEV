(function () {
  'use strict';

  angular
    .module('employes')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Employes',
      state: 'employes.list',
      type: 'item',
      roles: ['*']
    });

    // Add the dropdown list item
    // menuService.addSubMenuItem('topbar', 'employes', {
    //   title: 'List Employes',
    //   state: 'employes.list',
    //   roles: ['*']
    // });
  }
}());
