'use strict';

var planningsPolicy = require('../policies/plannings.server.policy'),
  plannings = require('../controllers/plannings.server.controller');

module.exports = function (app) {
  // Employes collection routes
  app.route('/api/plannings').all(planningsPolicy.isAllowed)
    .get(plannings.list)
    .post(plannings.create);

  // Single planning routes
  app.route('/api/plannings/:planningId').all(planningsPolicy.isAllowed)
    .get(plannings.read)
    .put(plannings.update)
    .delete(plannings.delete);

  // Finish by binding the planning middleware
  app.param('planningId', plannings.planningByID);
};
