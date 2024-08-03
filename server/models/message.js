'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const messageSchema = new Schema({
  authorId: Boolean,
  content: String,
  timestamp: {
    type: Number,
    default: Date.now
  }
});

const Message = mongoose.model('Message', messageSchema);


module.exports = Message;
