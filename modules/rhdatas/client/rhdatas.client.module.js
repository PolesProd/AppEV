'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('rhdatas');
ApplicationConfiguration.registerModule('rhdatas.admin', ['rhdatas']);
ApplicationConfiguration.registerModule('rhdatas.admin.routes', ['ui.router']);
