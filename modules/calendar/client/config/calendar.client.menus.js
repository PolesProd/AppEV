'use strict';

angular
.module('calendar').run(['Menus',

function (Menus) {
  Menus.addMenuItem('topbar', {
    title: 'Calendar',
    state: 'calendar.view',
    roles: ['*']
  });
}]);
