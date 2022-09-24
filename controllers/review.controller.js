const { Review } = require('../models/review.model');

const getAllReviews = async (req, res) => {
  try {
    const review = await Review.findAll();

    res.status(200).json({
      status: 'sucess',
      data: {
        review,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const createReview = async (req, res) => {
  try {
    const { userId, comment, rating } = req.body;
    const { restaurantId } = req.params;
    const newReview = await Review.create({
      userId,
      comment,
      restaurantId: restaurantId,
      rating,
    });
    res.status(201).json({
      status: 'sucess',
      data: { newReview },
    });
  } catch (error) {
    console.log(error);
  }
};

const updateReview = async (req, res) => {
  const { comment, rating } = req.body;
  const { review } = req;
  await review.update({ comment, rating });

  res.status(201).json({
    status: 'sucess',
    data: { review },
  });
};

const deleteReview = async (req, res) => {
  try {
    const { review } = req;
    await review.update({ status: 'deleted' });

    res.status(200).json({
      status: 'sucess',
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAllReviews, createReview, updateReview, deleteReview };
