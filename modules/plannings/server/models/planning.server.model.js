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
  week: { type: String, default: '', required: 'Please fill Planning name', trim: true },
  team: { type: Schema.Types.ObjectId, ref: 'Team' },
  site: { type: String },
  tasks: { type: String, default: '', required: 'Veuillez remplir les tâches.' },
  created: { type: Date, default: Date.now },
  user: { type: Schema.ObjectId, ref: 'User' }
}, { collection: 'plannings'});

module.exports = mongoose.model('Planning', PlanningSchema);
