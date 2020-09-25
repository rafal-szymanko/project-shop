const mongoose = require('mongoose');

const kitsSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  size: { type: Array, required: true },
  details: { type: Array, required: true },
  description: { type: Array, required: true },
  image: { type: String, required: true },
  bestseller: { type: Boolean, required: true },
  section: {type: String, required: true},
});

module.exports = mongoose.model('Kit', kitsSchema,'kits');
