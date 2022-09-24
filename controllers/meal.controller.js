const { Meal } = require('../models/meal.model');

const getAllMeals = async (req, res) => {
  try {
    const meal = await Meal.findAll({ where: { status: 'active' } });

    res.status(200).json({
      status: 'sucess',
      data: {
        meal,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const createMeal = async (req, res) => {
  try {
    const { name, price } = req.body;
    const { restaurantId } = req.params;
    const newMeal = await Meal.create({
      name,
      price,
      restaurantId: restaurantId,
    });

    res.status(200).json({
      status: 'sucess',
      data: {
        newMeal,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAllMeals };
