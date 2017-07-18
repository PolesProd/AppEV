'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Employe Schema
 */
var contrat = ['CDI', 'CDD', 'CDDI', 'Renouvelé', 'Licencié'];

var EmployeSchema = new Schema({
  lastname: { type: String, default: '', required: 'Nom requis', trim: true },
  firstname: { type: String, default: '', required: 'Prénom requis' },
  email: { type: String, default: '', required: 'Email requis' },
  number: { type: String, default: 'Aucun', required: 'Numéro requis' },
  team: { type: String, default: 'Par Défaut', required: 'Equipe requise' },
  formation: { type: String, default: 'Aucune', requuired: 'Formation requise' },
  contract: { type: [String], enum: contrat, required: '' },
  start_date: { type: Date, default: Date.now, required: 'Date requise' },
  end_date: { type: Date, default: Date.now, required: 'Date requise' },
  renew: { type: Date, default: Date.now },
  created: { type: Date, default: Date.now },
  user: { type: Schema.ObjectId, ref: 'User' }
}, { collection: 'employees' });

module.exports = mongoose.model('Employe', EmployeSchema);
