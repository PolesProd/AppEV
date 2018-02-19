(function (app) {
  'use strict';

  app.registerModule('sites', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('sites.admin', ['core.admin']);
  app.registerModule('sites.admin.routes', ['core.admin.routes']);
  app.registerModule('sites.services');
  app.registerModule('sites.routes', ['ui.router', 'core.routes', 'sites.services']);
}(ApplicationConfiguration));
