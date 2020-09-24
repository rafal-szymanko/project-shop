const express = require('express');
const router = express.Router();

const Accesories = require('../models/accesories.model');

router.get('/accesories', async (req, res) => {
  try {
    const result = await Accesories
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
