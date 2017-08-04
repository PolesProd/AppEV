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
  comments: { type: String, default: '', trim: true, required: '' },
  created: { type: Date, default: Date.now },
  user: { type: Schema.ObjectId, ref: 'User' }
}, { collection: 'lots' });

var CommentSchema = new mongoose.Schema({
  body: { type: String, default: '', required: 'Please fill Comment name', trim: true },
  user: { type: Schema.ObjectId, ref: 'User' },
  site: { type: mongoose.Schema.Types.ObjectId, ref: 'lot' }
});

module.exports = mongoose.model('Lot', LotSchema);
