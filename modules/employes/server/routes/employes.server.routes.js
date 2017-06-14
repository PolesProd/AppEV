'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  employesPolicy = require('../policies/employes.server.policy'),
  teamsPolicy = require(path.resolve('./modules/teams/server/policies/teams.server.policy')),
  teams = require(path.resolve('./modules/teams/server/controllers/teams.server.controller')),
  employes = require('../controllers/employes.server.controller');

module.exports = function(app) {
  // Employes Routes
  app.route('/api/employes').all(employesPolicy.isAllowed)
    .get(employes.list)
    .post(employes.create);

  app.route('/api/employes/:employeId').all(employesPolicy.isAllowed)
    .get(employes.read)
    .put(employes.update)
    .delete(employes.delete);

  app.route('/api/teams').all(teamsPolicy.isAllowed)
    .get(teams.list);

  // Finish by binding the Employe middleware
  app.param('employeId', employes.employeByID);
};
