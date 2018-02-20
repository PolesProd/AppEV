(function (app) {
  'use strict';

  app.registerModule('inventaires', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('inventaires.admin', ['core.admin']);
  app.registerModule('inventaires.admin.routes', ['core.admin.routes']);
  app.registerModule('inventaires.services');
  app.registerModule('inventaires.routes', ['ui.router', 'core.routes', 'inventaires.services']);
}(ApplicationConfiguration));
