const express = require('express');

const {
  getAllReviews,
  createReview,
  updateReview,
  deleteReview,
} = require('../controllers/review.controller');

//middlewares
const { reviewExists } = require('../middlewares/review.middleware');

//Routers
const reviewRouter = express.Router();

//Reviews
reviewRouter.post('/reviews/:restaurantId', createReview);
reviewRouter.patch('/reviews/:id', updateReview);
reviewRouter.delete('/reviews/:id', deleteReview);

module.exports = { reviewRouter };
