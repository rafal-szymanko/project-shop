const express = require('express');
const router = express.Router();

const Order = require('../models/orders.model');

router.post('/orders', async (req, res,) => {

  const {products, totalAmount, shippingDetails} = req.body;

  try {
    const count = await Order.countDocuments();
    const newOrder = new Order({products: products, totalAmount: totalAmount, shipping: shippingDetails, id: count + 1});    
    await newOrder.save();
    res.json(await Order.find());
  }
  catch(err) {
    res.status(500).json({message: err});
  }
} 
);

module.exports = router;
