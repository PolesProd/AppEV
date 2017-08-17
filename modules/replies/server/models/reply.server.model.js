'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
  Schema = mongoose.Schema;

/**
 * Reply Schema
 */
var ReplySchema = new Schema({
  created: { type: Date, default: Date.now },
  edited: { type: Date, default: null },
  lot: { type: Schema.ObjectId, ref: 'Lot' },
  content: { type: String, default: '', trim: true },
  user: { type: Schema.ObjectId, ref: 'User' },
  replies: [{ type: Schema.ObjectId, ref: 'Reply' }],
  nestedLevel: { type: Number, default: 1 },
  replyTo: { type: Schema.ObjectId, ref: 'Reply' }
}, { collection : 'replies' });

module.exports = mongoose.model('Reply', ReplySchema);
