'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Employe = mongoose.model('Employe'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Employe
 */
exports.create = function(req, res) {
  var employe = new Employe({
    lastname: req.body.lastname,
    firstname: req.body.firstname,
    email: req.body.email,
    number: req.body.number,
    team: req.body.team,
    status: req.body.status,
    formation: req.body.formation,
    contrat: req.body.contrat,
    start_date: req.body.start_date,
    end_date: req.body.end_date,
    renew: req.body.renew
  });
  employe.user = req.user;

  employe.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(employe);
    }
  });
};

/**
 * Show the current Employe
 */
exports.read = function(req, res) {
  console.log(Employe);
  // convert mongoose document to JSON
  var employe = req.employe ? req.employe.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  employe.isCurrentUserOwner = req.user && employe.user && employe.user._id.toString() === req.user._id.toString();

  res.jsonp(employe);
};

/**
 * Update a Employe
 */
exports.update = function(req, res) {
  var employe = req.employe;

  employe = _.extend(employe, req.body);

  employe.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(employe);
    }
  });
};

/**
 * Delete an Employe
 */
exports.delete = function(req, res) {
  var employe = req.employe;

  employe.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(employe);
    }
  });
};

/**
 * List of Employes
 */
exports.list = function(req, res) {
  Employe.find().sort('-created').populate('user', 'displayName').exec(function(err, employes) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(employes);
    }
  });
};

/**
 * Employe middleware
 */
exports.employeByID = function(req, res, next, id) {

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
        message: 'No Employe with that identifier has been found'
      });
    }
    req.employe = employe;
    next();
  });
};
