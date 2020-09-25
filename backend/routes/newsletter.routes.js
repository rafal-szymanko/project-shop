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
  


  //   const {author, title, text } = req.fields;
  //   const file = req.files.photo;

  //   function validateEmail(author) {
  //     // eslint-disable-next-line no-useless-escape
  //     const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  //     return re.test(String(author).toLowerCase());
  //   }

//   if (title && author && validateEmail(author) && text) {
//     if(title.length >= 10 && text.length >= 20) {
//       try {
//         const newPost = new Post(
//           {...req.fields, photo: file ? file.path.split('/').slice(-1)[0] : null});    
//         await newPost.save();
//         res.json(await Post.find());
//       }
//       catch(err) {
//         res.status(500).json({message: err});
//       }
//     } else {
//       throw new Error('Check number of characters');
//     }
//   } else {
//     throw new Error('Wrong input!');
//   }
});

// router.put('/post/:id/edit', async (req, res,) => {

//   const {author, title, text, photo} = req.fields;
//   const file = req.files.photo;

//   function validateEmail(author) {
//     // eslint-disable-next-line no-useless-escape
//     const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
//     return re.test(String(author).toLowerCase());
//   }

//   if (title && validateEmail(author) && text) {
//     if(title.length >= 10 && text.length >= 20) {

//       const checkImage = () => {
//         if(photo) {
//           return photo;
//         }
//         else if (!req.files.photo || !photo) {
//           return null;
//         } else if(req.files.photo) {
//           return file.path.split('/').slice(-1)[0];
//         }
//       };

//       try {
//         const find = await Post.findOneAndUpdate({_id: req.params.id}, {...req.fields, photo: checkImage()}, {returnOriginal: false});
//         console.log(find);
//         res.json(await Post.findOne({_id: req.params.id}));
//       }
//       catch(err) {
//         res.status(500).json({message: err});
//       }
//     } else {
//       throw new Error('Check number of characters');
//     }
//   } else {
//     throw new Error('Wrong input!');
//   }
// });

module.exports = router;
