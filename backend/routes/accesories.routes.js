const express = require('express');
const router = express.Router();

const Accessory = require('../models/accesories.model');

router.get('/accesories', async (req, res) => {
  try {
    const result = await Accessory
      .find({bestseller: true})
      .select('name price image section');
    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
