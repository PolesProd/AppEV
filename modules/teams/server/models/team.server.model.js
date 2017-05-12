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
  name: {
    type: String,
    default: '',
    required: 'Please fill Team name',
    trim: true
  },
  sites: {
    type: String,
    required: 'Vous devze précisé le site d\'intervention'
  },
  member: {
    type: Schema.ObjectId,
    ref: 'Employee'
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

mongoose.model('Team', TeamSchema);
