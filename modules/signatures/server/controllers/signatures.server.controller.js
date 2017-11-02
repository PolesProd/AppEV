'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Signature = mongoose.model('Signature'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Signature
 */
exports.create = function(req, res) {
  var signature = new Signature(req.body);
  signature.user = req.user;

  signature.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(signature);
    }
  });
};

/**
 * Show the current Signature
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var signature = req.signature ? req.signature.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  signature.isCurrentUserOwner = req.user && signature.user && signature.user._id.toString() === req.user._id.toString();

  res.jsonp(signature);
};

/**
 * Update a Signature
 */
exports.update = function(req, res) {
  var signature = req.signature;

  signature = _.extend(signature, req.body);

  signature.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(signature);
    }
  });
};

/**
 * Delete an Signature
 */
exports.delete = function(req, res) {
  var signature = req.signature;

  signature.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(signature);
    }
  });
};

/**
 * List of Signatures
 */
exports.list = function(req, res) {
  Signature.find().sort('-created').populate('user', 'displayName').exec(function(err, signatures) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(signatures);
    }
  });
};

/**
 * Signature middleware
 */
exports.signatureByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Signature is invalid'
    });
  }

  Signature.findById(id).populate('user', 'displayName').exec(function (err, signature) {
    if (err) {
      return next(err);
    } else if (!signature) {
      return res.status(404).send({
        message: 'No Signature with that identifier has been found'
      });
    }
    req.signature = signature;
    next();
  });
};
