const { Review } = require('../models/review.model');

const reviewExists = async (req, res, next) => {
  try {
    const { id } = req.params;
    const review = await Review.findOne({ where: { id } });

    if (!review) {
      return res.status(404).json({
        status: 'error',
        message: 'Review not found',
      });
    }

    req.review = review;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { reviewExists };
