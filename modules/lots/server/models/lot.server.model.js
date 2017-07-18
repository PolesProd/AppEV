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
  name: { type: String, default: '', required: '', trim: true },
  number: { type: Number, required: '' },
  description: { type: String, default: '', trim: true, required: '' },
  location: { type: Object, required: '' },
  nature: { type: String, default: '', trim: true, required: '' },
  frequence: { type: Number, required: '' },
  finition: { type: String, default: '', trim: true, required: '' },
  surface: { type: String, default: '', trim: true, required: '' },
  created: { type: Date, default: Date.now },
  user: { type: Schema.ObjectId, ref: 'User' }
});

mongoose.model('Lot', LotSchema);
