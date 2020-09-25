const mongoose = require('mongoose');

const booksSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  author: {type: String, required: true},
  details: { type: Array, required: true},
  description: { type: String, required: true },
  image: { type: String, required: true },
  bestseller: { type: Boolean, required: true },
  section: {type: String, required: true},
});

module.exports = mongoose.model('Book', booksSchema,'books');