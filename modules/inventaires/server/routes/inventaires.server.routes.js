'use strict';

var inventairesPolicy = require('../policies/inventaires.server.policy'),
  inventaires = require('../controllers/inventaires.server.controller');

module.exports = function (app) {
  // Employes collection routes
  app.route('/api/inventaires').all(inventairesPolicy.isAllowed)
    .get(inventaires.list)
    .post(inventaires.create);

  // Single inventaire routes
  app.route('/api/inventaires/:inventaireId').all(inventairesPolicy.isAllowed)
    .get(inventaires.read)
    .put(inventaires.update)
    .delete(inventaires.delete);

  // Finish by binding the inventaire middleware
  app.param('inventaireId', inventaires.inventaireByID);
};
