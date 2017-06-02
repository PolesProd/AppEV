'use strict';

/**
* Module dependencies
*/
var path = require('path'),
  teamsPolicy = require('../policies/teams.server.policy'),
  employeesPolicy = require(path.resolve('../vlg-espaces-verts/modules/employees/server/policies/employees.server.policy')),
  teams = require('../controllers/teams.server.controller'),
  employees = require(path.resolve('../vlg-espaces-verts/modules/employees/server/controllers/employees.server.controller'));

module.exports = function(app) {
  // Teams Routes
  app.route('/api/teams').all(teamsPolicy.isAllowed)
    .get(teams.list)
    .post(teams.create);


  app.route('/api/teams/:teamId').all(teamsPolicy.isAllowed)
    .get(teams.read)
    .put(teams.update)
    .delete(teams.delete);

  app.route('/api/employees').all(employeesPolicy.isAllowed)
    .get(employees.list);

  app.route('/api/employees/:employeeId').all(employeesPolicy.isAllowed)
    .get(employees.read)
    .put(employees.update)
    .delete(employees.delete);

  // Finish by binding the Team middleware
  app.param('teamId', teams.teamByID);
};
