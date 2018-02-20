'use strict';

var equipesPolicy = require('../policies/equipes.server.policy'),
  equipes = require('../controllers/equipes.server.controller');

module.exports = function (app) {
  // Employes collection routes
  app.route('/api/equipes').all(equipesPolicy.isAllowed)
    .get(equipes.list)
    .post(equipes.create);

  // Single equipe routes
  app.route('/api/equipes/:equipeId').all(equipesPolicy.isAllowed)
    .get(equipes.read)
    .put(equipes.update)
    .delete(equipes.delete);

  // Finish by binding the equipe middleware
  app.param('equipeId', equipes.equipeByID);
};
