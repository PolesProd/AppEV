'use strict';

/**
 * Module dependencies
 */
var lotsPolicy = require('../policies/lots.server.policy'),
  lots = require('../controllers/lots.server.controller');

module.exports = function(app) {
  // Lots Routes
  app.route('/api/lots').all(lotsPolicy.isAllowed)
    .get(lots.list)
    .post(lots.create);

  app.route('/api/lots/:lotId').all(lotsPolicy.isAllowed)
    .get(lots.read)
    .put(lots.update)
    .delete(lots.delete);

  // Finish by binding the Lot middleware
  app.param('lotId', lots.lotByID);
};
