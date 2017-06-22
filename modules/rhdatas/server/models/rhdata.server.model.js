'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Rhdata Schema
 */
var RhdataSchema = new Schema({
  employe: { type: Schema.Types.ObjectId, required: 'Please fill Rhdata name' },
  created: { type: Date, default: Date.now },
  user: { type: Schema.ObjectId, ref: 'User' }
}, { collection: 'rhdatas' });

mongoose.model('Rhdata', RhdataSchema);
