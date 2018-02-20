'use strict';

var employesPolicy = require('../policies/employes.server.policy'),
  employes = require('../controllers/employes.server.controller');

module.exports = function (app) {
  // Employes collection routes
  app.route('/api/employes').all(employesPolicy.isAllowed)
    .get(employes.list)
    .post(employes.create);

  // Single employe routes
  app.route('/api/employes/:employeId').all(employesPolicy.isAllowed)
    .get(employes.read)
    .put(employes.update)
    .delete(employes.delete);

  // Finish by binding the employe middleware
  app.param('employeId', employes.employeByID);
};
