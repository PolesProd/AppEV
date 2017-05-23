'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('teams', ['users']);
ApplicationConfiguration.registerModule('teams.admin', ['teams']);
ApplicationConfiguration.registerModule('teams.admin.routes', ['ui.router']);
