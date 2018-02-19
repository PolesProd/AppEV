(function (app) {
  'use strict';

  app.registerModule('equipes', ['core','mwl.calendar', 'ui.bootstrap', 'ngResource', 'ngAnimate']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('equipes.admin', ['core.admin']);
  app.registerModule('equipes.admin.routes', ['core.admin.routes']);
  app.registerModule('equipes.services');
  app.registerModule('equipes.routes', ['ui.router', 'core.routes', 'equipes.services']);
}(ApplicationConfiguration));
