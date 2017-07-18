'use strict';

angular.module('lots').run(['Menus',
function (Menus) {
  // Set top bar menu items
  Menus.addMenuItem('topbar', {
    title: 'Sites',
    state: 'lots.list',
    type: 'items',
    roles: ['*']
  });
}]);
