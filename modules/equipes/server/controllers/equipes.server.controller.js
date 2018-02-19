'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Equipe = mongoose.model('Equipe'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an equipe
 */
exports.create = function (req, res) {
  var equipe = new Equipe(req.body);
  equipe.user = req.user;

  equipe.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(equipe);
    }
  });
};

/**
 * Show the current equipe
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var equipe = req.equipe ? req.equipe.toJSON() : {};

  // Add a custom field to the Equipe, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Equipe model.
  equipe.isCurrentUserOwner = !!(req.user && equipe.user && equipe.user._id.toString() === req.user._id.toString());

  res.json(equipe);
};

/**
 * Update an equipe
 */
exports.update = function (req, res) {
  var equipe = req.equipe;

  equipe.title = req.body.title;
  equipe.content = req.body.content;

  equipe.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(equipe);
    }
  });
};

/**
 * Delete an equipe
 */
exports.delete = function (req, res) {
  var equipe = req.equipe;

  equipe.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(equipe);
    }
  });
};

/**
 * List of Equipes
 */
exports.list = function (req, res) {
  Equipe.find().sort('-created').populate('user', 'displayName').exec(function (err, equipes) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(equipes);
    }
  });
};

/**
 * Equipe middleware
 */
exports.equipeByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Equipe is invalid'
    });
  }

  Equipe.findById(id).populate('user', 'displayName').exec(function (err, equipe) {
    if (err) {
      return next(err);
    } else if (!equipe) {
      return res.status(404).send({
        message: 'No equipe with that identifier has been found'
      });
    }
    req.equipe = equipe;
    next();
  });
};
