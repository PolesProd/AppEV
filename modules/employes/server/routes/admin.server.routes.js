'use strict';

/**
 * Module dependencies.
 */
var adminPolicy = require('../policies/employes.server.policy'),
  admin = require('../controllers/employe-admin.server.controller');

module.exports = function (app) {
  // Employe route registration first.
  require('./employes.server.routes.js')(app);

  // employes collection routes
  app.route('/api/employes')
    .get(adminPolicy.isAllowed, admin.list);

  // Single employe routes
  app.route('/api/employes/:employeId')
    .get(adminPolicy.isAllowed, admin.read)
    .put(adminPolicy.isAllowed, admin.update)
    .delete(adminPolicy.isAllowed, admin.delete);

  // Finish by binding the employe middleware
  app.param('employeId', admin.employeByID);
};
