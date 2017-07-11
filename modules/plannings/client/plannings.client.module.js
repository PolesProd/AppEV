'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('plannings', ['isteven-multi-select']);
ApplicationConfiguration.registerModule('plannings.admin', ['plannings']);
ApplicationConfiguration.registerModule('plannings.admin.routes', ['ui.router']);
