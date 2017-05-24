'use strict';

/**
 * Module dependencies
 */
var teamsPolicy = require('../policies/teams.server.policy'),
  teams = require('../controllers/teams.server.controller');
  // employeesPolicy = require('../employees/server/policies/employees.sever.policy'),
  // employees = require('../employees/server/controllers/employees.server.controller');

module.exports = function(app) {
  // Teams Routes
  app.route('/api/teams').all(teamsPolicy.isAllowed)
    .get(teams.list)
    .post(teams.create);

  // app.route('/api/employees').all(employeesPolicy.isAllowed)
  //   .get(employees.list)
  //   .post(employees.create);

  app.route('/api/teams/:teamId').all(teamsPolicy.isAllowed)
    .get(teams.read)
    .put(teams.update)
    .delete(teams.delete);

  // Finish by binding the Team middleware
  app.param('teamId', teams.teamByID);
};
