const express = require('express');
const router = express.Router();

const Books = require('../models/books.model');

router.get('/books', async (req, res) => {
  try {
    const result = await Books
      .find({bestseller: true})
      .select('name price image');
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
