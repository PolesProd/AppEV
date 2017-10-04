'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('teams', ['ui.bootstrap']);
ApplicationConfiguration.registerModule('teams.admin', ['teams']);
ApplicationConfiguration.registerModule('teams.admin.routes', ['ui.router']);
