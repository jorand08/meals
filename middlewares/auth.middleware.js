const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');

const { User } = require('../models/user.model');

dotenv.config({ path: '/config.env' });

const protecSession = async (req, res, next) => {
  try {
    //get token-- A travez de header
    let token;

    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith('Bearer')
    ) {
      //extrac token
      //req.headers.autorization = "Beare"
      token = req.headers.authorization.split(' ')[1]; //--> [bearer, token]
    }

    //check if the token was sent or not
    if (!token) {
      res.status(403).json({
        status: 'Error',
        massage: 'Invalid Token',
      });
    }

    //verify the token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    //verify the token´s

    const user = await User.findOne({
      where: { id: decoded.id, status: 'active' },
    });

    if (!user) {
      return res.status(403).json({
        status: 'error',
        message: 'The owner of the session is no longer active',
      });
    }

    //grant access
    req.protecSession = user;
    next();
  } catch (error) {
    console.log(error);
  }
};

const protectUsersAccount = async (req, res, next) => {
  try {
    const { protecSession, user } = req;

    if (protecSession.id !== user.id) {
      return res.status(403).json({
        status: 'Error',
        message: 'You are not the owner of this account',
      });
    }
    next();
  } catch (error) {
    console.log(error);
  }
};

const protectGetAll = (req, res, next) => {
  const { protecSession } = req;

  if (protecSession.role !== 'admin') {
    return res.status(403).json({
      status: 'Error',
      message: 'invalid role',
    });
  }
  next();
};

module.exports = { protecSession, protectUsersAccount, protectGetAll };
