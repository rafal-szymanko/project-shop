const mongoose = require('mongoose');

const newsletterSchema = new mongoose.Schema({
  mail: { type: String, required: true },
});

module.exports = mongoose.model('Newsletter', newsletterSchema, 'newsletter');