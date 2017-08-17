'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Lot Schema
 */
var LotSchema = new Schema({
  number: { type: Number, required: '' },
  name: { type: String, default: '', required: '', trim: true },
  surface: { type: String, default: '', required: '' },
  image: { type: Buffer, contentType: String },
  description: { type: String, default: '', required: '' },
  replies: [{ type: Schema.ObjectId, ref: 'Reply' }],
  created: { type: Date, default: Date.now },
  user: { type: Schema.ObjectId, ref: 'User' }
}, { collection: 'lots' });

module.exports = mongoose.model('Lot', LotSchema);
