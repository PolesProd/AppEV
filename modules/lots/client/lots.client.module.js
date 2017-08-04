'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('lots');
ApplicationConfiguration.registerModule('lots.admin', ['lots']);
ApplicationConfiguration.registerModule('lots.admin.routes', ['ui.router']);
