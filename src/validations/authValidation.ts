import { check } from 'express-validator';

export const registerValidation = [
  check('fullName', 'Full name is required')
    .not()
    .isEmpty()
    .withMessage('Full name cannot be empty')
    .isLength({ min: 2 })
    .withMessage('Full name must be at least 2 characters long')
    .trim()
    .escape(),
  check('email', 'Please include a valid email').isEmail().withMessage('Invalid email format').normalizeEmail(),
  check('password', 'Password must be 6 or more characters')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long')
    .matches(/[A-Z]/)
    .withMessage('Password must contain at least one uppercase letter')
    .matches(/[a-z]/)
    .withMessage('Password must contain at least one lowercase letter')
    .matches(/[0-9]/)
    .withMessage('Password must contain at least one number')
    .matches(/[\W]/)
    .withMessage('Password must contain at least one special character'),
];

export const loginValidation = [
  check('email', 'Please include a valid email').isEmail().withMessage('Invalid email format').normalizeEmail(),
  check('password', 'Password is required')
    .not()
    .isEmpty()
    .withMessage('Password cannot be empty')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters long'),
];
