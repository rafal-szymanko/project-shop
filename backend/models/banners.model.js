const mongoose = require('mongoose');

const bannersSchema = new mongoose.Schema({
  image: { type: String, required: true },
  alt: { type: String, required: true },
});

module.exports = mongoose.model('Banner', bannersSchema, 'banners');