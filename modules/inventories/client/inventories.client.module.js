'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('inventories');
ApplicationConfiguration.registerModule('inventories.admin', ['inventories']);
ApplicationConfiguration.registerModule('inventories.admin.routes', ['ui.router']);
