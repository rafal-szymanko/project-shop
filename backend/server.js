const express = require('express');
const cors = require('cors');
const path = require('path');
const mongoose = require('mongoose');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const bannersRoutes = require('./routes/banners.routes');
const newsletterRoutes = require('./routes/newsletter.routes');
const productsRoutes = require('./routes/products.routes');
const ordersRoutes = require('./routes/orders.routes');
const sessionsRoutes = require('./routes/sessions.routes');

const app = express();

/* MIDDLEWARE */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

/* MONGOOSE */
mongoose.connect('mongodb://localhost:27017/ManUtdStore', { useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
const db = mongoose.connection;

app.use(session({
  secret: '4f7WBXJamuf5sH',
  store: new MongoStore({ mongooseConnection: db }),
}));


db.once('open', () => {
  console.log('Successfully connected to the database');
});
db.on('error', err => console.log('Error: ' + err));

/* API ENDPOINTS */
app.use('/api', productsRoutes);
app.use('/api', bannersRoutes);
app.use('/api', newsletterRoutes);
app.use('/api', ordersRoutes);
app.use('/api', sessionsRoutes);

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

/* START SERVER */
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log('Server is running on port: '+port);
});
