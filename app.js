const express = require('express');

//Routers
const { usersRouter } = require('./routes/users.route');
const { restaurantRouter } = require('./routes/restaurant.route');
const { reviewRouter } = require('./routes/review.route');

const app = express();

app.use(express.json()); // middelware

app.use('/api/v1/users', usersRouter);
app.use('/api/v1/restaurants', restaurantRouter);
app.use('/api/v1/restaurants', reviewRouter);

//Catch non-existing endpoints -- preguntar!
app.all('*', (req, res) => {
  res.status(404).json({
    status: 'Error',
    message: `${req.method} ${req.url} does not exists ir our server`,
  });
});

module.exports = { app };
