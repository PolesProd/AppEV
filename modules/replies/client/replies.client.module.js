'use strict';

// Use Applicaion configuration module to register a new module
ApplicationConfiguration.registerModule('replies');
ApplicationConfiguration.registerModule('replies.admin', ['replies']);
ApplicationConfiguration.registerModule('replies.admin.routes', ['ui.router']);
