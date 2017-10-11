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
  name: { type: String, default: '', required: '', trim: true },
  start: { type: Date, default: '', required: '' },
  end: { type: Date, default: '', required: '' },
  team: { type: String, default: 'Par Défaut', required: '' },
  site: { type: String, default: 'Lot', required: '' },
  tasks: { type: String, default: '', required: '' },
  isFullDay: { type: Boolean, default: false },
  created: { type: Date, default: Date.now },
  user: { type: Schema.ObjectId, ref: 'User' }
}, { collection: 'plannings' });

module.exports = mongoose.model('Planning', PlanningSchema);
