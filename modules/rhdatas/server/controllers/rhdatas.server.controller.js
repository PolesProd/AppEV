'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Rhdata = mongoose.model('Rhdata'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Rhdata
 */
exports.create = function(req, res) {
  var rhdata = new Rhdata(req.body);
  rhdata.user = req.user;

  rhdata.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(rhdata);
    }
  });
};

/**
 * Show the current Rhdata
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var rhdata = req.rhdata ? req.rhdata.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  rhdata.isCurrentUserOwner = req.user && rhdata.user && rhdata.user._id.toString() === req.user._id.toString();

  res.jsonp(rhdata);
};

/**
 * Update a Rhdata
 */
exports.update = function(req, res) {
  var rhdata = req.rhdata;

  rhdata = _.extend(rhdata, req.body);

  rhdata.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(rhdata);
    }
  });
};

/**
 * Delete an Rhdata
 */
exports.delete = function(req, res) {
  var rhdata = req.rhdata;

  rhdata.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(rhdata);
    }
  });
};

/**
 * List of Rhdatas
 */
exports.list = function(req, res) {
  Rhdata.find().sort('-created').populate('user', 'displayName').exec(function(err, rhdatas) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(rhdatas);
    }
  });
};

/**
 * Rhdata middleware
 */
exports.rhdataByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Rhdata is invalid'
    });
  }

  Rhdata.findById(id).populate('user', 'displayName').exec(function (err, rhdata) {
    if (err) {
      return next(err);
    } else if (!rhdata) {
      return res.status(404).send({
        message: 'No Rhdata with that identifier has been found'
      });
    }
    req.rhdata = rhdata;
    next();
  });
};
