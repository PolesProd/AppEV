(function (app) {
  'use strict';

  app.registerModule('employes', ['core']);// The core module is required for special route handling; see /core/client/config/core.client.routes
  app.registerModule('employes.admin', ['core.admin']);
  app.registerModule('employes.admin.routes', ['core.admin.routes']);
  app.registerModule('employes.services');
  app.registerModule('employes.routes', ['ui.router', 'core.routes', 'employes.services']);
}(ApplicationConfiguration));
