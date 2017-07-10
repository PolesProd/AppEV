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
  start: { type: Date, default: '', required: 'Date requise' },
  end: { type: Date, default: '', required: 'Date requise' },
  team: { type: Schema.Types.ObjectId, ref: 'Team', required: 'Equipe requise' },
  site: { type: Schema.Types.ObjectId, ref: 'Lot', required: 'Site requise' },
  tasks: { type: String, default: '', required: 'Tâches requise' },
  created: { type: Date, default: Date.now },
  user: { type: Schema.ObjectId, ref: 'User' }
}, { collection: 'plannings' });

module.exports = mongoose.model('Planning', PlanningSchema);
