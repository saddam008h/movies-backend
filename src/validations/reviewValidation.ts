import { check } from 'express-validator';

export const reviewValidation = [
  check('text', 'text is required').not().isEmpty().withMessage('text cannot be empty').trim(),
  check('rating', 'rating is required')
    .not()
    .isEmpty()
    .withMessage('rating cannot be empty')
    .isInt({ min: 1, max: 5 })
    .withMessage('rating must be an integer between 1 and 5'),
];
