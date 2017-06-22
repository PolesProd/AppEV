'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('employes');
ApplicationConfiguration.registerModule('employes.admin', ['employes']);
ApplicationConfiguration.registerModule('employes.admin.routes', ['ui.router']);
