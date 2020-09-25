const express = require('express');
const router = express.Router();

const Book = require('../models/books.model');

router.get('/books', async (req, res) => {
  try {
    const result = await Book
      .find({bestseller: true})
      .select('name price image section');
    if(!result) res.status(404).json({ books: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
