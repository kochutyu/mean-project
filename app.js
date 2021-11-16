const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');
const analyticsRoutes = require('./routes/analytics');
const categoryRoutes = require('./routes/category');
const orderRoutes = require('./routes/order');
const positionRoutes = require('./routes/position');
const {mongoURL} = require('./config/keys');
const app = express();

// TODO: Swagger
// const swaggerUI = require('swagger-ui-express');
// import swDocument from './swagger/open-api'
// app.use('/docs',swaggerUI.serve,swaggerUI.setup(swDocument))

mongoose.connect(mongoURL)
    .then(() => console.log('MongoDb connected.'))
    .catch(error => console.log(error))

app.use(passport.initialize({}))
require('./middleware/passport')(passport)

app.use(require('morgan')('dev'))
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(require('cors')(''))

app.use('/api/auth', authRoutes);
app.use('/api/analytics', analyticsRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/positions', positionRoutes);

module.exports = app;
