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
  name: {
    type: String,
    default: '',
    required: 'Veuillez indiquer le nom du lot',
    trim: true
  },
  number: {
    type: Number,
    required: 'Veuillez indiquer le numéro du lot'
  },
  description: {
    type: String,
    default: '',
    trim: true,
    required: 'Veuillez ajouté une description au lot'
  },
  location: {
    type: [Number, Number],
    required: 'Veuillez renseigné la localisation du lot'
  },
  nature: {
    type: String,
    default: '',
    trim: true,
    required: 'Veuillez indiquer la nature de l\'intervention'
  },
  frequence: {
    type: Number,
    required: 'Veuillez indiquer la fréquence d\'intervention'
  },
  finition: {
    type: String,
    default: '',
    trim: true,
    required: 'Veuillez indiquer le type de finition souhaité'
  },
  surface: {
    type: String,
    default: '',
    trim: true,
    required: 'Veuillez indiquer le type de surface'
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

mongoose.model('Lot', LotSchema);
