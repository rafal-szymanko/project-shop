const express = require('express');
const router = express.Router();

const Newsletter = require('../models/newsletter.model');


router.post('/newsletter', async (req, res,) => {

  const {mail} = req.body;
  
  const validateEmail = (mail) => {
    // eslint-disable-next-line no-useless-escape
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(mail).toLowerCase());
  };

  if(validateEmail(mail)) {
    try {
      const result = await Newsletter.find({mail: req.body.mail});
      if(result.length === 0) {
        const newNewsletter = new Newsletter({mail: req.body.mail});    
        await newNewsletter.save();
        res.json(await Newsletter.find());
      } else {
        throw Error('Email exist in database');
      }

    }
    catch(err) {
      res.status(500).json({message: err});
    }
  }
  
});


module.exports = router;
