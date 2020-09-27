const express = require('express');
const router = express.Router();

const Newsletter = require('../models/newsletter.model');


router.post('/newsletter', async (req, res,) => {
  const {mail} = req.body;
  function validateEmail(mail) {
    // eslint-disable-next-line no-useless-escape
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(mail).toLowerCase());
  }

  if(validateEmail(mail)) {
    try {
      const newPost = new Newsletter({mail: req.body.mail});    
      await newPost.save();
      res.json(await Newsletter.find());
    }
    catch(err) {
      res.status(500).json({message: err});
    }
  }
  
});


module.exports = router;
