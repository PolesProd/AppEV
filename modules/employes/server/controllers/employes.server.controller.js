'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Employe = mongoose.model('Employe'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an employe
 */
exports.create = function (req, res) {
  var employe = new Employe(req.body);
  employe.user = req.user;

  employe.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(employe);
    }
  });
};

/**
 * Show the current employe
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var employe = req.employe ? req.employe.toJSON() : {};

  // Add a custom field to the Employe, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Employe model.
  employe.isCurrentUserOwner = !!(req.user && employe.user && employe.user._id.toString() === req.user._id.toString());

  res.json(employe);
};

/**
 * Update an employe
 */
exports.update = function (req, res) {
  var employe = req.employe;

  employe.title = req.body.title;
  employe.content = req.body.content;

  employe.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(employe);
    }
  });
};

/**
 * Delete an employe
 */
exports.delete = function (req, res) {
  var employe = req.employe;

  employe.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(employe);
    }
  });
};

/**
 * List of Employes
 */
exports.list = function (req, res) {
  Employe.find().sort('-created').populate('user', 'displayName').exec(function (err, employes) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(employes);
    }
  });
};

/**
 * Employe middleware
 */
exports.employeByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Employe is invalid'
    });
  }

  Employe.findById(id).populate('user', 'displayName').exec(function (err, employe) {
    if (err) {
      return next(err);
    } else if (!employe) {
      return res.status(404).send({
        message: 'No employe with that identifier has been found'
      });
    }
    req.employe = employe;
    next();
  });
};
