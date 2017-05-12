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
  name: {
    type: String,
    default: '',
    required: 'Please fill Planning name',
    trim: true
  },
  team: {
    type: Schema.ObjectId,
    ref: 'Team'
  },
  site: {
    type: Schema.ObjectId,
    ref: 'Lot'
  },
  tasks: {
    type: String,
    default: '',
    required: 'Veuillez remplir les tâches.'
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

mongoose.model('Planning', PlanningSchema);
