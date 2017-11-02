'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Inventory Schema
 */
var InventorySchema = new Schema({
  name: { type: String, default: '', required: '', trim: true },
  purchase_date: { type: String, default: '', required: '' },
  place_of_purchase: { type: String, default: '', required: '' },
  warenty: { type: String, default: '', required: '' },
  serial_number: { type: Number, default: '', required: '' },
  model: { type: String, default: '', required: '' },
  category: { type: String, default: '', required: '' },
  quatntity: { type: Number, default: '', required: '' },
  created: { type: Date, default: Date.now },
  user: { type: Schema.ObjectId, ref: 'User' }
});

mongoose.model('Inventory', InventorySchema);
