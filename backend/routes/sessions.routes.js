const express = require('express');
const router = express.Router();

const Session = require('../models/sessions.model');


router.post('/sessions', async (req, res,) => {
  req.session = {
    products : req.body.products,
    totalAmount: req.body.totalAmount,
    status: 'draft',
  };
});


module.exports = router;
