const dotenv = require('dotenv');

const { User } = require('../models/user.model');
const { Meal } = require('../models/meal.model');
const { Order } = require('../models/order.model');
const { Restaurant } = require('../models/restaurants.model');
const { Review } = require('../models/review.model');

dotenv.config({ path: './config.env' });

const getAllRestaurant = async (req, res) => {
  try {
    const restaurants = await Restaurant.findAll({
      where: { status: 'active' },
    });

    res.status(200).json({
      status: 'sucess',
      data: {
        restaurants,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const getOneRestaurant = async (req, res) => {
  try {
    const { id } = req.params;
    const resta = await Restaurant.findOne({ where: { id } });

    res.status(200).json({
      status: 'sucess',
      data: {
        resta,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const createRestaurant = async (req, res) => {
  const { name, address, rating } = req.body;
  const newRestaurant = await Restaurant.create({ name, address, rating });
  res.status(201).json({
    status: 'sucess',
    data: { newRestaurant },
  });
};

const updateRestaurant = async (req, res) => {
  try {
    const { name, address } = req.body;
    const { restaurant } = req;

    await restaurant.update({ name, address });
    res.status(200).json({
      status: 'sucess',
      data: { restaurant },
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteRestaurant = async (req, res) => {
  const { restaurant } = req;
  await restaurant.update({ status: 'Disabled' });

  res.status(200).json({
    status: 'sucess',
    data: { restaurant },
  });
};

module.exports = {
  getAllRestaurant,
  createRestaurant,
  updateRestaurant,
  getOneRestaurant,
  deleteRestaurant,
};
