import { check } from 'express-validator';

export const movieValidation = [
  check('title', 'title is required').not().isEmpty().withMessage('title cannot be empty').trim(),
  check('description', 'description is required').not().isEmpty().withMessage('description cannot be empty').trim(),
  check('videoUrl', 'VideoUrl is required')
    .not()
    .isEmpty()
    .withMessage('VideoUrl cannot be empty')
    .isURL()
    .withMessage('VideoUrl must be a valid URL')
    .matches(/^(http(s)??\:\/\/)?(www\.)?((youtube\.com\/watch\?v=)|(youtu.be\/))([a-zA-Z0-9\-_])+/)
    .withMessage('VideoUrl must be a valid YouTube URL'),
  check('posterUrl', 'PosterUrl must be a valid URL').isURL(),
  check('backdropUrl', 'BackdropUrl must be a valid URL').isURL(),
  check('genres', 'Genres is required').isArray().withMessage('Genres must be an array').not().isEmpty().withMessage('Genres cannot be empty'),
  check('releaseDate', 'ReleaseDate is required').optional().isDate().withMessage('ReleaseDate must be a valid date'),
  check('runtime', 'Runtime must be a number')
    .optional()
    .isNumeric()
    .withMessage('Runtime must be a number')
    .isFloat({ min: 0 })
    .withMessage('Runtime cannot be negative'),
  check('budget', 'Budget must be a number')
    .optional()
    .isNumeric()
    .withMessage('Budget must be a number')
    .isFloat({ min: 0 })
    .withMessage('Budget cannot be negative'),
  check('revenue', 'Revenue must be a number')
    .optional()
    .isNumeric()
    .withMessage('Revenue must be a number')
    .isFloat({ min: 0 })
    .withMessage('Revenue cannot be negative'),
];
