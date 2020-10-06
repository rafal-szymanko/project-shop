const express = require('express');
const router = express.Router();

const Order = require('../models/orders.model');

router.post('/orders', async (req, res,) => {

  const {products, totalAmount, shippingDetails} = req.body;

  const validateEmail = (author) => {
    // eslint-disable-next-line no-useless-escape
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(author).toLowerCase());
  };

  if(shippingDetails.name && shippingDetails.address && shippingDetails.code && shippingDetails.mail && shippingDetails.phone && validateEmail(shippingDetails.mail)) {
    if(products.length > 0) {
      try {
        const count = await Order.countDocuments();
        const newOrder = new Order({products: products, totalAmount: totalAmount, shipping: shippingDetails, id: count + 1, status: 'confirmed'});    
        await newOrder.save();
        res.json(await Order.find());
      }
      catch(err) {
        res.status(500).json({message: err});
      }
    } else {
      throw new Error('Empty shopping basket');
    }
  } else {
    throw new Error('Check your shipping details');
  }
} 
);

module.exports = router;
