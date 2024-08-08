const mongoose = require('mongoose');
const billItemSchema = require('./billItem');

const billSchema = new mongoose.Schema({
  date: { type: Date, default: Date.now },
  items: [billItemSchema],
  totalAmount: Number,
});

module.exports = mongoose.model('Bill', billSchema);