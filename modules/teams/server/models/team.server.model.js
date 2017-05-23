'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;
  // User = require('./modules/users/server/models/user.sever.model.js');

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

module.exports = mongoose.model('Team', TeamSchema);
