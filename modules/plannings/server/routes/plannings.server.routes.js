'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  planningsPolicy = require('../policies/plannings.server.policy'),
  teamsPolicy = require(path.resolve('./modules/teams/server/policies/teams.server.policy')),
  teams = require(path.resolve('./modules/teams/server/controllers/teams.server.controller')),
  plannings = require('../controllers/plannings.server.controller');

module.exports = function(app) {
  // Plannings Routes
  app.route('/api/plannings').all(planningsPolicy.isAllowed)
    .get(plannings.list)
    .post(plannings.create);

  app.route('/api/plannings/:planningId').all(planningsPolicy.isAllowed)
    .get(plannings.read)
    .put(plannings.update)
    .delete(plannings.delete);

  // app.route('/api/teams').all(teamsPolicy.isAllowed)
  //   .get(teams.list);
  //
  // app.route('/api/teams/:teamId').all(teamsPolicy.isAllowed)
  //   .get(teams.read)
  //   .put(teams.update);

  // Finish by binding the Planning middleware
  app.param('planningId', plannings.planningByID);
};
