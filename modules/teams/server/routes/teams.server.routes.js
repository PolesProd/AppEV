'use strict';

/**
* Module dependencies
*/
var path = require('path'),
  teamsPolicy = require('../policies/teams.server.policy'),
  employesPolicy = require(path.resolve('./modules/employes/server/policies/employes.server.policy')),
  employes = require(path.resolve('./modules/employes/server/controllers/employes.server.controller')),
  teams = require('../controllers/teams.server.controller');

module.exports = function(app) {
  // Teams Routes
  app.route('/api/teams').all(teamsPolicy.isAllowed)
    .get(teams.list)
    .post(teams.create);


  app.route('/api/teams/:teamId').all(teamsPolicy.isAllowed)
    .get(teams.read)
    .put(teams.update)
    .delete(teams.delete);

  app.route('/api/teams').all(employesPolicy.isAllowed)
    .get(employes.list);

  // Finish by binding the Team middleware
  app.param('teamId', teams.teamByID);
};
