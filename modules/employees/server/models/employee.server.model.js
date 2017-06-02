'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Employee Schema
 */
var EmployeeSchema = new Schema({
  lastname: {
    type: String,
    default: '',
    required: 'Remplissez le nom de l\'employé.',
    trim: true
  },
  firstname: {
    type: String,
    default: '',
    required: 'Remplissez le prénom de l\'employé.'
  },
  email: {
    type: String,
    default: '',
    required: 'Remplissez l\'email de l\'employé.'
  },
  profileImageURL: {
    type: String,
    default: 'modules/users/client/img/profile/default.png'
  },
  contract: {
    type: String,
    default: '',
    required: 'Ajouter le type de contrat.'
  },
  training: {
    type: String,
    default: '',
    required: 'Remplissez la formation de l\'employé'
  },
  team: {
    type: Schema.ObjectId,
    ref: 'Team'
  },
  created: {
    type: Date,
    default: Date.now
  },
  user: {
    type: Schema.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Employee', EmployeeSchema);
