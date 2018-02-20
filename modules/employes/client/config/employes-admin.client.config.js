(function () {
  'use strict';

  // Configuring the Employes Admin module
  angular
    .module('employes.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Employes',
      state: 'admin.employes.list'
    });
  }
}());
