const express = require('express');
const router = express.Router();

const Banner = require('../models/banners.model');

router.get('/banners', async (req, res) => {
  try {
    const result = await Banner.find();
    if(!result) res.status(404).json({ banner: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
