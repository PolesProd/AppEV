'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Inventaire = mongoose.model('Inventaire'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an inventaire
 */
exports.create = function (req, res) {
  var inventaire = new Inventaire(req.body);
  inventaire.user = req.user;

  inventaire.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(inventaire);
    }
  });
};

/**
 * Show the current inventaire
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var inventaire = req.inventaire ? req.inventaire.toJSON() : {};

  // Add a custom field to the Inventaire, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Inventaire model.
  inventaire.isCurrentUserOwner = !!(req.user && inventaire.user && inventaire.user._id.toString() === req.user._id.toString());

  res.json(inventaire);
};

/**
 * Update an inventaire
 */
exports.update = function (req, res) {
  var inventaire = req.inventaire;

  inventaire.title = req.body.title;
  inventaire.content = req.body.content;

  inventaire.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(inventaire);
    }
  });
};

/**
 * Delete an inventaire
 */
exports.delete = function (req, res) {
  var inventaire = req.inventaire;

  inventaire.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(inventaire);
    }
  });
};

/**
 * List of Inventaires
 */
exports.list = function (req, res) {
  Inventaire.find().sort('-created').populate('user', 'displayName').exec(function (err, inventaires) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(inventaires);
    }
  });
};

/**
 * Inventaire middleware
 */
exports.inventaireByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Inventaire is invalid'
    });
  }

  Inventaire.findById(id).populate('user', 'displayName').exec(function (err, inventaire) {
    if (err) {
      return next(err);
    } else if (!inventaire) {
      return res.status(404).send({
        message: 'No inventaire with that identifier has been found'
      });
    }
    req.inventaire = inventaire;
    next();
  });
};
