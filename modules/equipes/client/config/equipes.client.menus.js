(function () {
  'use strict';

  angular
    .module('equipes')
    .run(menuConfig);

  menuConfig.$inject = ['menuService'];

  function menuConfig(menuService) {
    menuService.addMenuItem('topbar', {
      title: 'Equipes',
      state: 'equipes.list',
      type: 'item',
      roles: ['*']
    });

    // Add the dropdown list item
    // menuService.addSubMenuItem('topbar', 'equipes', {
    //   title: 'List Equipes',
    //   state: 'equipes.list',
    //   roles: ['*']
    // });
  }
}());
