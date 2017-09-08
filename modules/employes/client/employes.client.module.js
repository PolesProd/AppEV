'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('employes', ['core']);
ApplicationConfiguration.registerModule('employes.admin', ['core.admin']);
ApplicationConfiguration.registerModule('employes.admin.routes', ['ui.router', 'core.admin.routes']);
