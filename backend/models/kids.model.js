const mongoose = require('mongoose');

const kidsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  size: { type: Array},
  details: { type: Array},
  description: { type: Array, required: true },
  image: { type: String, required: true },
  bestseller: { type: Boolean, required: true },
});

module.exports = mongoose.model('Kids', kidsSchema);