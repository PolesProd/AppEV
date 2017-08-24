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
  manager: { type: String, default: '', required: '' },
  site: { type: String, default: 'Lot', required: 'Site requis' },
  member: { type: String, default: 'John Doe', required: 'Salarié(es) requis' },
  created: { type: Date, default: Date.now },
  user: { type: Schema.ObjectId, ref: 'User' }
}, { collection: 'teams' });

module.exports = mongoose.model('Team', TeamSchema);
