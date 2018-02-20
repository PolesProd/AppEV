'use strict';

/**
 * Module dependencies
 */
var path = require('path'),
  mongoose = require('mongoose'),
  Planning = mongoose.model('Planning'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Create an planning
 */
exports.create = function (req, res) {
  var planning = new Planning(req.body);
  planning.user = req.user;

  planning.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(planning);
    }
  });
};

/**
 * Show the current planning
 */
exports.read = function (req, res) {
  // convert mongoose document to JSON
  var planning = req.planning ? req.planning.toJSON() : {};

  // Add a custom field to the Planning, for determining if the current User is the "owner".
  // NOTE: This field is NOT persisted to the database, since it doesn't exist in the Planning model.
  planning.isCurrentUserOwner = !!(req.user && planning.user && planning.user._id.toString() === req.user._id.toString());

  res.json(planning);
};

/**
 * Update an planning
 */
exports.update = function (req, res) {
  var planning = req.planning;

  planning.title = req.body.title;
  planning.content = req.body.content;

  planning.save(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(planning);
    }
  });
};

/**
 * Delete an planning
 */
exports.delete = function (req, res) {
  var planning = req.planning;

  planning.remove(function (err) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(planning);
    }
  });
};

/**
 * List of Plannings
 */
exports.list = function (req, res) {
  Planning.find().sort('-created').populate('user', 'displayName').exec(function (err, plannings) {
    if (err) {
      return res.status(422).send({
        message: errorHandler.getErrorMessage(err)
      });
    } else {
      res.json(plannings);
    }
  });
};

/**
 * Planning middleware
 */
exports.planningByID = function (req, res, next, id) {

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).send({
      message: 'Planning is invalid'
    });
  }

  Planning.findById(id).populate('user', 'displayName').exec(function (err, planning) {
    if (err) {
      return next(err);
    } else if (!planning) {
      return res.status(404).send({
        message: 'No planning with that identifier has been found'
      });
    }
    req.planning = planning;
    next();
  });
};
