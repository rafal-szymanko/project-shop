const express = require('express');
const router = express.Router();

const Kids = require('../models/kids.model');

router.get('/kids', async (req, res) => {
  try {
    const result = await Kids
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
