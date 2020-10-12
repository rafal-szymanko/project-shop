const express = require('express');
const router = express.Router();

const Product = require('../models/products.model');

router.get('/products/bestsellers', async (req, res) => {
  try {
    const result = await Product
      .find({bestseller: true})
      .select('name price image section');
    if(!result) res.status(404).json({ products: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('/products/all', async (req, res) => {
  try {
    const result = await Product
      .find()
      .select('name price image section bestseller');
    if(!result) res.status(404).json({ products: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('/products/kits', async (req, res) => {
  try {
    const result = await Product
      .find({section: 'kits'})
      .select('name price image section');
    if(!result) res.status(404).json({ products: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('/products/kids', async (req, res) => {
  try {
    const result = await Product
      .find({section: 'kids'})
      .select('name price image section');
    if(!result) res.status(404).json({ products: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('/products/accessories', async (req, res) => {
  try {
    const result = await Product
      .find({section: 'accessories'})
      .select('name price image section');
    if(!result) res.status(404).json({ products: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('/products/books', async (req, res) => {
  try {
    const result = await Product
      .find({section: 'books'})
      .select('name price image section');
    if(!result) res.status(404).json({ products: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});

router.get('/products/:id', async (req, res) => {
  try {
    const result = await Product
      .find({_id: req.params.id});
    if(!result) res.status(404).json({ product: 'Not found' });
    else res.json(result);
  }
  catch(err) {
    res.status(500).json(err);
  }
});


module.exports = router;
