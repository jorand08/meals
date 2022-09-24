const { Restaurant } = require('../models/restaurants.model');

const restaurantExists = async (req, res, next) => {
  try {
    const { id } = req.params;
    const restaurant = await Restaurant.findOne({ where: { id } });
    if (!restaurant) {
      return res.status(404).json({
        status: 'error',
        message: 'Restaurant not found',
      });
    }
    req.restaurant = restaurant;
    next();
  } catch (error) {
    console.log(error);
  }
};

module.exports = { restaurantExists };
