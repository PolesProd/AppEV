'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('calendar', ['core', 'ui.calendar', 'ui.bootstrap']);// The core module is required for special route handling; see /core/client/config/core.client.routes
ApplicationConfiguration.registerModule('calendar.services');
ApplicationConfiguration.registerModule('calendar.routes', ['ui.router', 'core.admin.routes', 'calendar.services']);
