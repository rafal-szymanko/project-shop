const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  author: {type: String},
  size: { type: Array},
  details: { type: Array},
  description: { type: String, required: true },
  image: { type: String, required: true },
  bestseller: { type: Boolean, required: true },
  section: {type: String, required: true},
});

module.exports = mongoose.model('Product', productsSchema,'products');