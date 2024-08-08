const mongoose = require('mongoose');

const billItemSchema = new mongoose.Schema({
  itemId: { type: mongoose.Schema.Types.ObjectId, ref: 'Item' },
  quantity: Number,
});

module.exports = billItemSchema;