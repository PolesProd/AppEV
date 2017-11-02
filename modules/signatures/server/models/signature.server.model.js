'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Signature Schema
 */
var SignatureSchema = new Schema({
  employe: { type: String, default: '', required: '' },
  date: { type: String, default: '', required: '' },
  status: { type: String, default: '', required: '' },
  time: { type: String, default: '', required: '' },
  observations: { type: String, default: '', required: '' },
  created: { type: Date, default: Date.now },
  user: { type: Schema.ObjectId, ref: 'User' }
});

mongoose.model('Signature', SignatureSchema);
