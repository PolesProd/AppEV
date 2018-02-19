(function () {
  'use strict';

  // Configuring the Employes Admin module
  angular
    .module('plannings.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Plannings',
      state: 'admin.plannings.list'
    });
  }
}());
