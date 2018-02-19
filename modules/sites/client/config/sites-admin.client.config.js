(function () {
  'use strict';

  // Configuring the Articles Admin module
  angular
    .module('sites.admin')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(Menus) {
    Menus.addSubMenuItem('topbar', 'admin', {
      title: 'Manage Sites',
      state: 'admin.sites.list'
    });
  }
}());
