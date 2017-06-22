'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  rhdatasPolicy = require('../policies/rhdatas.server.policy'),
  employesPolicy = require(path.resolve('./modules/employes/server/policies/employes.server.policy')),
  employes = require(path.resolve('./modules/employes/server/controllers/employes.server.controller')),
  rhdatas = require('../controllers/rhdatas.server.controller');

module.exports = function(app) {
  // Rhdatas Routes
  app.route('/api/rhdatas').all(rhdatasPolicy.isAllowed)
    .get(rhdatas.list)
    .post(rhdatas.create);

  app.route('/api/rhdatas/:rhdataId').all(rhdatasPolicy.isAllowed)
    .get(rhdatas.read)
    .put(rhdatas.update)
    .delete(rhdatas.delete);

  app.route('/api/employes').all(employesPolicy.isAllowed)
    .get(employes.list);

  // Finish by binding the Rhdata middleware
  app.param('rhdataId', rhdatas.rhdataByID);
};
