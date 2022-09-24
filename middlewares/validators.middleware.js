const { body, validationResult } = require('express-validator');

const checkvalidations = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    const errorMessages = errors.array().map((err) => err.msg);

    const message = errorMessages.join('. ');
    return res.status(400).json({
      status: 'Error',
      message,
    });
  }
  next();
};

const createUserValidators = [
  body('name')
    .isString()
    .withMessage('Name must be a string')
    .notEmpty()
    .withMessage('Name cannot be empty')
    .isLength({ min: 3 })
    .withMessage('Name most be at least 3 characters'),
  body('email').isEmail().withMessage('Must provide a valid email'),
  body('password')
    .isString()
    .withMessage('Password must be a string')
    .notEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 8 })
    .withMessage('Password most be at least 3 characters'),
  checkvalidations,
];

const createRestaurantValidators = [
  body('name')
    .isString()
    .withMessage('Name must be a string')
    .notEmpty()
    .withMessage('Name cannot be empty')
    .isLength({ min: 3 })
    .withMessage('Name most be at least 3 characters'),
  body('address').isString().withMessage('address cannot be empty'),
  body('rating')
    .isNumeric()
    .withMessage('rating must be a number')
    .notEmpty()
    .withMessage('rating cannot be empty')
    .isLength({ max: 1 })
    .withMessage('rating most be at least 1 characters'),
  checkvalidations,
];

module.exports = { createUserValidators, createRestaurantValidators };
