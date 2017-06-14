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
  lastname: { type: String, default: '', required: 'Please fill Employe name', trim: true },
  firstname: { type: String, default: '', required: 'Please fill Employe firstname' },
  email: { type: String, default: '', required: 'Please fill Employe email' },
  team_id: { type: Schema.Types.ObjectId, ref: 'Team' },
  formation: { type: String, default: '', requuired: 'Please fill Employe formation' },
  contract: { type: String, default: '', required: 'Please fill Employe contract' },
  created: { type: Date, default: Date.now },
  user: { type: Schema.ObjectId, ref: 'User' }
}, { collection: 'employees' });

module.exports = mongoose.model('Employe', EmployeSchema);
