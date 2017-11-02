'use strict';

/**
 * Module dependencies
 */
var signaturesPolicy = require('../policies/signatures.server.policy'),
  signatures = require('../controllers/signatures.server.controller');

module.exports = function(app) {
  // Signatures Routes
  app.route('/api/signatures').all(signaturesPolicy.isAllowed)
    .get(signatures.list)
    .post(signatures.create);

  app.route('/api/signatures/:signatureId').all(signaturesPolicy.isAllowed)
    .get(signatures.read)
    .put(signatures.update)
    .delete(signatures.delete);

  // Finish by binding the Signature middleware
  app.param('signatureId', signatures.signatureByID);
};
