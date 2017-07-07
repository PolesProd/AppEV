'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Team Schema
 */
var TeamSchema = new Schema({
  name: { type: String, default: '', required: 'Nom requis', trim: true },
  site: { type: Schema.Types.ObjectId, ref: 'Lot', required: 'Site requis' },
  member: { type: Schema.Types.ObjectId, ref: 'Employe', required: 'Salarié(es) requis' },
  created: { type: Date, default: Date.now },
  user: { type: Schema.ObjectId, ref: 'User' }
}, { collection: 'teams' });

module.exports = mongoose.model('Team', TeamSchema);
