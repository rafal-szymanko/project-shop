const mongoose = require('mongoose');

const sessionsSchema = new mongoose.Schema({
  shipping: { type: Object, required: true },
  products: { type: Array, required: true },
  totalAmount: {type: Number, required: true},
  status: {type: String, required: true},
});

module.exports = mongoose.model('Session', sessionsSchema,'sessions');