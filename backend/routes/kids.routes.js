const express = require('express');
const router = express.Router();

const Kid = require('../models/kids.model');

router.get('/kids', async (req, res) => {
  try {
    const result = await Kid
      .find({bestseller: true})
      .select('name price image section');
    if(!result) res.status(404).json({ kids: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

module.exports = router;
