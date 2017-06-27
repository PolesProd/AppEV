'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  planningsPolicy = require('../policies/plannings.server.policy'),
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

  // Finish by binding the Planning middleware
  app.param('planningId', plannings.planningByID);
};
