(function () {
  'use strict';

  // Configuring the Employes Admin module
  angular
    .module('inventaires.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Inventaires',
      state: 'admin.inventaires.list'
    });
  }
}());
