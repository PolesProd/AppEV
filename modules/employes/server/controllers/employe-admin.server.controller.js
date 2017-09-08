'use strict';

var path = require('path'),
	mongoose = require('mongoose'),
	Employe = mongoose.model('Employe'),
  errorHandler = require(path.resolve('./modules/core/server/controllers/errors.server.controller'));

/**
 * Voir employe
**/
exports.read = function(req, res) {
	res.json(req.model);
};

/**
 * Editer un employé
**/
exports.update = function(req, res) {
	var employe = req.model;

	//For security purposes only merge these parameters
  employe.lastname = req.body.lastname;
  employe.firstname = req.body.firstname;
  employe.email = req.body.email;
  employe.number = req.body.number;
  employe.team = req.body.team;
  employe.status = req.body.status;
  employe.formation = req.body.formation;
  employe.contrat = req.body.contrat;
  employe.start_date = req.body.start_date;
  employe.end_date = req.body.end_date;
  employe.renew = req.body.renew;
  employe.displayName = employe.firstname + ' ' + employe.lastname;
  employe.user = req.user;

  employe.save(function (err) {
    if (err) {
      return res.status(400).send({
        message: errorHandler.getErrorMessage(err)
      });
    }

    res.json(employe);
  });
};

/**
 * Supprimer un employé
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
 * Liste des employés
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
 * employé middleware
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
