'use strict';

/**
 * Module dependencies
 */
var financesPolicy = require('../policies/finances.server.policy'),
  finances = require('../controllers/finances.server.controller');

module.exports = function(app) {
  // Finances Routes
  app.route('/api/finances').all(financesPolicy.isAllowed)
    .get(finances.list)
    .post(finances.create);

  app.route('/api/finances/:financeId').all(financesPolicy.isAllowed)
    .get(finances.read)
    .put(finances.update)
    .delete(finances.delete);

  // Finish by binding the Finance middleware
  app.param('financeId', finances.financeByID);
};
