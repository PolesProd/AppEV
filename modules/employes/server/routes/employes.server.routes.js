'use strict';

/**
 * Module dependencies
 */
var employesPolicy = require('../policies/employes.server.policy'),
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

  // Finish by binding the Employe middleware
  app.param('employeId', employes.employeByID);
};