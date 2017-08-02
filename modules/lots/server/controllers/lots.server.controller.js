'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Lot = mongoose.model('Lot'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Lot
 */
exports.create = function(req, res) {
  var lot = new Lot({
    name: req.body.name,
    number: req.body.number,
    surface: req.body.surface,
    image: req.body.image,
    description: req.body.description,
    comments: req.body.comments
  });
  lot.user = req.user;

  lot.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(lot);
    }
  });
};

/**
 * Show the current Lot
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var lot = req.lot ? req.lot.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  lot.isCurrentUserOwner = req.user && lot.user && lot.user._id.toString() === req.user._id.toString();

  res.jsonp(lot);
};

/**
 * Update a Lot
 */
exports.update = function(req, res) {
  var lot = req.lot;

  lot = _.extend(lot, req.body);

  lot.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(lot);
    }
  });
};

/**
 * Delete an Lot
 */
exports.delete = function(req, res) {
  var lot = req.lot;

  lot.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(lot);
    }
  });
};

/**
 * List of Lots
 */
exports.list = function(req, res) {
  Lot.find().sort('-created').populate('user', 'displayName').exec(function(err, lots) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(lots);
    }
  });
};

/**
 * Lot middleware
 */
exports.lotByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Lot is invalid'
    });
  }

  Lot.findById(id).populate('user', 'displayName').exec(function (err, lot) {
    if (err) {
      return next(err);
    } else if (!lot) {
      return res.status(404).send({
        message: 'No Lot with that identifier has been found'
      });
    }
    req.lot = lot;
    next();
  });
};
