const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

//Models

//utils
const { catchAsync } = require("../utils/catchAsync.util");
const { AppError } = require("../utils/appError");

dotenv.config({ path: "./config.env" });

//Gen random jwt sings
//require('crypto').randomBytes(64).toString('hex') -> Enter into the node console paste the command

const getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.findAll({
    attributes: { exclude: ["password"] },
    where: { status: "active" },
  });

  res.status(200).json({
    status: "sucess",
    data: {
      users,
    },
  });
});

const createUsers = catchAsync(async (req, res, next) => {
  const { name, email, password, role } = req.body;

  if (role !== "admin" && role !== "normal") {
    return res.status(400).json({
      status: "error",
      message: "invalid Role",
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
    status: "sucess",
    data: { newUser },
  });
});

const updateUsers = catchAsync(async (req, res, next) => {
  const { name, email } = req.body;
  const { user } = req;

  await user.update({ name, email });

  res.status(200).json({
    status: "sucess",
    data: { user },
  });
});

const deleteUser = catchAsync(async (req, res, next) => {
  const { user } = req;
  await user.update({ status: "disabled" });

  res.status(200).json({
    status: "sucess",
  });
});

const login = catchAsync(async (req, res, next) => {
  //get email and password from req.body
  const { email, password } = req.body;
  //Validate if the user exist with given email
  const user = await User.findOne({
    where: { email, status: "active" },
  });
  //Compare password (entered password vs db password)
  //if user does´t  exists or passwords doesn't match, send error
  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(400).json({
      status: "error",
      message: "Wrong credentials",
    });
  }
  //Remove password from response
  user.password = undefined;
  // generate JWT (payload, secreteOrPrivateKey, options)
  const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });

  res.status(200).json({
    status: "sucess",
    data: { user, token },
  });
});

module.exports = { getAllUsers, createUsers, updateUsers, deleteUser, login };
