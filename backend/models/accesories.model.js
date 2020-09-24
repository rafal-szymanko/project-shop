const mongoose = require('mongoose');

const accesoriesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  details: { type: Array},
  description: { type: String, required: true },
  image: { type: String, required: true },
  bestseller: { type: Boolean, required: true },
});

module.exports = mongoose.model('Accesories', accesoriesSchema);