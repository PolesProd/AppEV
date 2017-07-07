'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Employe Schema
 */
var EmployeSchema = new Schema({
  lastname: { type: String, default: '', required: 'Nom requis', trim: true },
  firstname: { type: String, default: '', required: 'Prénom requis' },
  email: { type: String, default: '', required: 'Email requis' },
  number: { type: String, default: '', required: 'Numéro requis' },
  team: { type: Schema.Types.ObjectId, ref: 'Team', required: 'Equipe requise' },
  formation: { type: String, default: '', requuired: 'Formation requise' },
  contract: { type: String, default: '', required: 'Contrat requis' },
  created: { type: Date, default: Date.now },
  user: { type: Schema.ObjectId, ref: 'User' }
}, { collection: 'employees' });

module.exports = mongoose.model('Employe', EmployeSchema);
