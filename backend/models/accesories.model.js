const mongoose = require('mongoose');

const accessoriesSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  details: { type: Array},
  description: { type: String, required: true },
  image: { type: String, required: true },
  bestseller: { type: Boolean, required: true },
  section: {type: String, required: true},
});

module.exports = mongoose.model('Accessory', accessoriesSchema, 'accesories');