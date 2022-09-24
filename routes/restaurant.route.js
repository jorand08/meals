const express = require('express');

const { getAllReviews } = require('../controllers/review.controller');

//contorllers
const {
  getAllRestaurant,
  createRestaurant,
  updateRestaurant,
  getOneRestaurant,
  deleteRestaurant,
} = require('../controllers/restaurant.controller');

//middlewares
const { restaurantExists } = require('../middlewares/restaurant.middleware');
const {
  createRestaurantValidators,
} = require('../middlewares/validators.middleware');
const {
  protecSession,
  protectGetAll,
} = require('../middlewares/auth.middleware');
//Routers
const restaurantRouter = express.Router();
restaurantRouter.get('/reviews', getAllReviews);
restaurantRouter.get('/', getAllRestaurant);
restaurantRouter.get('/:id', restaurantExists, getOneRestaurant);

restaurantRouter.use(protecSession);

restaurantRouter.post(
  '/',
  protectGetAll,
  createRestaurantValidators,
  createRestaurant
);
restaurantRouter.patch(
  '/:id',
  protectGetAll,
  restaurantExists,
  updateRestaurant
);
restaurantRouter.delete(
  '/:id',
  protectGetAll,
  restaurantExists,
  deleteRestaurant
);

module.exports = { restaurantRouter };
