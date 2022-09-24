const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const { User } = require('../models/user.model');
const { Meal } = require('../models/meal.model');
const { Order } = require('../models/order.model');
const { Restaurant } = require('../models/restaurants.model');
const { Review } = require('../models/review.model');

dotenv.config({ path: './config.env' });

//Gen random jwt sings
//require('crypto').randomBytes(64).toString('hex') -> Enter into the node console paste the command

const getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      attributes: { exclude: ['password'] },
    });

    res.status(200).json({
      status: 'sucess',
      data: {
        users,
      },
    });
  } catch (error) {
    console.log(error);
  }
};

const createUsers = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    if (role !== 'admin' && role !== 'normal') {
      return res.status(400).json({
        status: 'error',
        message: 'invalid Role',
      });
    }

    //encrypt the password
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });

    //remove password
    newUser.password = undefined;

    res.status(201).json({
      status: 'sucess',
      data: { newUser },
    });
  } catch (error) {
    console.log(error);
  }
};

const updateUsers = async (req, res) => {
  try {
    const { name, email } = req.body;
    const { user } = req;

    await user.update({ name, email });

    res.status(200).json({
      status: 'sucess',
      data: { user },
    });
  } catch (error) {
    console.log(error);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { user } = req;
    await user.update({ status: 'disabled' });

    res.status(200).json({
      status: 'sucess',
    });
  } catch (error) {
    console.log(error);
  }
};

const login = async (req, res) => {
  try {
    //get email and password from req.body
    const { email, password } = req.body;
    //Validate if the user exist with given email
    const user = await User.findOne({
      where: { email, status: 'active' },
    });
    //Compare password (entered password vs db password)
    //if user does´t  exists or passwords doesn't match, send error
    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({
        status: 'error',
        message: 'Wrong credentials',
      });
    }
    //Remove password from response
    user.password = undefined;
    // generate JWT (payload, secreteOrPrivateKey, options)
    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    });

    res.status(200).json({
      status: 'sucess',
      data: { user, token },
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports = { getAllUsers, createUsers, updateUsers, deleteUser, login };
