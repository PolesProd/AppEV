'use strict';

/**
 * Module dependencies.
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Finance = mongoose.model('Finance'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller')),
  _ = require('lodash');

/**
 * Create a Finance
 */
exports.create = function(req, res) {
  var finance = new Finance(req.body);
  finance.user = req.user;

  finance.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(finance);
    }
  });
};

/**
 * Show the current Finance
 */
exports.read = function(req, res) {
  // convert mongoose document to JSON
  var finance = req.finance ? req.finance.toJSON() : {};

  // Add a custom field to the Article, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Article model.
  finance.isCurrentUserOwner = req.user && finance.user && finance.user._id.toString() === req.user._id.toString();

  res.jsonp(finance);
};

/**
 * Update a Finance
 */
exports.update = function(req, res) {
  var finance = req.finance;

  finance = _.extend(finance, req.body);

  finance.save(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(finance);
    }
  });
};

/**
 * Delete an Finance
 */
exports.delete = function(req, res) {
  var finance = req.finance;

  finance.remove(function(err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(finance);
    }
  });
};

/**
 * List of Finances
 */
exports.list = function(req, res) {
  Finance.find().sort('-created').populate('user', 'displayName').exec(function(err, finances) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.jsonp(finances);
    }
  });
};

/**
 * Finance middleware
 */
exports.financeByID = function(req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Finance is invalid'
    });
  }

  Finance.findById(id).populate('user', 'displayName').exec(function (err, finance) {
    if (err) {
      return next(err);
    } else if (!finance) {
      return res.status(404).send({
        message: 'No Finance with that identifier has been found'
      });
    }
    req.finance = finance;
    next();
  });
};
