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
  filter: { type: String, default: '', required: 'Type requis' },
  name: { type: String, default: '', required: 'Nom requis', trim: true },
  model: { type: String, default: '', required: 'Modèle requis' },
  quantity: { type: Number, default: '', required: '' },
  created: { type: Date, default: Date.now },
  user: { type: Schema.ObjectId, ref: 'User' }
});

mongoose.model('Inventory', InventorySchema);
