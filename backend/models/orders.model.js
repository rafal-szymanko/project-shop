const mongoose = require('mongoose');

const ordersSchema = new mongoose.Schema({
  shipping: { type: Object, required: true },
  products: { type: Array, required: true },
  totalAmount: {type: Number, required: true},
  id: {type: Number, required: true},
});

module.exports = mongoose.model('Order', ordersSchema,'orders');