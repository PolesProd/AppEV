'use strict';

/**
* Module dependencies.
*/
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
* Planning Schema
*/
var PlanningSchema = new Schema({
  name: { type: String, default: '', required: 'Nom requis', trim: true },
  start: { type: String, default: '', required: 'Date requise' },
  end: { type: String, default: '', required: 'Date requise' },
  team: { type: String, default: 'Par Défaut', required: 'Equipe requise' },
  site: { type: String, default: 'Lot', required: 'Site requise' },
  tasks: { type: String, default: '', required: 'Tâches requise' },
  isFullDay: { type: Boolean, default: false },
  created: { type: Date, default: Date.now },
  user: { type: Schema.ObjectId, ref: 'User' }
}, { collection: 'plannings' });

module.exports = mongoose.model('Planning', PlanningSchema);
