const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const formidable = require('express-formidable');
const uniqid = require('uniqid');

const kitsRoutes = require('./routes/kits.routes');
const accesoriesRoutes = require('./routes/accesories.routes');
const kidsRoutes = require('./routes/kids.routes');
const booksRoutes = require('./routes/books.routes');

const app = express();

/* MIDDLEWARE */
app.use(cors());
app.use(formidable({ uploadDir: './public/uploads' }, [{
  event: 'fileBegin', // on every file upload...
  action: (req, res, next, name, file) => {
    const fileName = uniqid() + '.' + file.name.split('.')[1];
    file.path = __dirname + '/public/uploads/photo_' + fileName; // ...move the file to public/uploads with unique name
  },
},
]));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* API ENDPOINTS */
app.use('/api', kitsRoutes);
app.use('/api', kidsRoutes);
app.use('/api', booksRoutes);
app.use('/api', accesoriesRoutes);

/* API ERROR PAGES */
app.use('/api', (req, res) => {
  res.status(404).send({ post: 'Not found...' });
});

/* REACT WEBSITE */
app.use(express.static(path.join(__dirname, '/public')));
app.use(express.static(path.join(__dirname, '../build')));
app.use('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../build/index.html'));
});

/* MONGOOSE */
mongoose.connect('mongodb://localhost:27017/bulletinBoard', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
const db = mongoose.connection;
db.once('open', () => {
  console.log('Successfully connected to the database');
});
db.on('error', err => console.log('Error: ' + err));

/* START SERVER */
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log('Server is running on port: '+port);
});
