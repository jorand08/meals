const express = require('express');

//contorllers
const {
  getAllUsers,
  createUsers,
  updateUsers,
  deleteUser,
  login,
} = require('../controllers/user.controller');

//middlewares
const { userExists } = require('../middlewares/user.middlewares');
const {
  createUserValidators,
} = require('../middlewares/validators.middleware');

const {
  protecSession,
  protectUsersAccount,
  protectGetAll,
} = require('../middlewares/auth.middleware');

//Routers
const usersRouter = express.Router();
usersRouter.post('/login', login);
usersRouter.post('/signup', createUserValidators, createUsers);

usersRouter.use(protecSession);

usersRouter.get('/', protectGetAll, getAllUsers);
usersRouter.patch('/:id', userExists, protectUsersAccount, updateUsers);
usersRouter.delete('/:id', userExists, protectUsersAccount, deleteUser);

module.exports = { usersRouter };
