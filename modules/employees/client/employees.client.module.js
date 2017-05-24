'use strict';

ApplicationConfiguration.registerModule('employees', ['teams']);
ApplicationConfiguration.registerModule('employees.admin', ['employees']);
ApplicationConfiguration.registerModule('employees.admin.routes', ['ui.router']);
