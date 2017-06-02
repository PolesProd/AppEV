'use strict';

/**
 * Module dependencies
 */

var path = require('path'),
  employeesPolicy = require('../policies/employees.server.policy'),
  teamsPolicy = require(path.resolve('../vlg-espaces-verts/modules/teams/server/policies/teams.server.policy')),
  employees = require('../controllers/employees.server.controller'),
  teams = require(path.resolve('../vlg-espaces-verts/modules/teams/server/controllers/teams.server.controller'));

module.exports = function(app) {
  // Employees Routes
  app.route('/api/employees').all(employeesPolicy.isAllowed)
    .get(employees.list)
    .post(employees.create);

  app.route('/api/employees/:employeeId').all(employeesPolicy.isAllowed)
    .get(employees.read)
    .put(employees.update)
    .delete(employees.delete);

  app.route('/api/teams').all(teamsPolicy.isAllowed)
    .get(teams.list)
    .post(teams.create);

  app.route('/api/teams/:teamId').all(teamsPolicy.isAllowed)
    .get(teams.read)
    .put(teams.update)
    .delete(teams.delete);

  // Finish by binding the Employee middleware
  app.param('employeeId', employees.employeeByID);
};
