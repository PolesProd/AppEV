(function (app) {
  'use strict';

  app.registerModule('plannings', ['core','mwl.calendar', 'ui.bootstrap', 'ngResource', 'ngAnimate']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('plannings.admin', ['core.admin']);
  app.registerModule('plannings.admin.routes', ['core.admin.routes']);
  app.registerModule('plannings.services');
  app.registerModule('plannings.routes', ['ui.router', 'core.routes', 'plannings.services']);
}(ApplicationConfiguration));
