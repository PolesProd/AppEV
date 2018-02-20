(function () {
  'use strict';

  // Configuring the Employes Admin module
  angular
    .module('equipes.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Equipes',
      state: 'admin.equipes.list'
    });
  }
}());
