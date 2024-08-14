import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { createReview, updateReview, deleteReview, seedReviews, getPagedReviewsByMovieId, getPagedReviewsByUserId } from '../services/reviewService';
import { AuthenticatedRequest } from 'middlewares/authenticatedRequest';

// 1) Handles creating a new review with the provided data.
export const createReviewHandler = async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(500).json({ status: false, msg: errors.array()[0].msg });
  }

  const { text, rating } = req.body;
  const userId = req.user._id;
  const movieId = req.params.movieId;

  try {
    const review = await createReview(text, rating, userId, movieId);
    return res.status(200).json({ status: true, msg: 'Review created successfully', data: review });
  } catch (err) {
    return res.status(500).json({ status: false, msg: err.message || 'Server error' });
  }
};

// 2) Retrieves all movies from the database.
export const updateReviewHandler = async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(500).json({ status: false, msg: errors.array()[0].msg });
  }

  const { text, rating } = req.body;
  const reviewId = req.params.id;
  const userId = req.user._id;

  try {
    const review = await updateReview(reviewId, text, rating, userId);
    return res.status(200).json({ status: true, msg: 'Review updated successfully', data: review });
  } catch (err) {
    return res.status(500).json({ status: false, msg: err.message || 'Server error' });
  }
};

// 3) Retrieves a movie by its ID.
export const deleteReviewHandler = async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  try {
    const userId = req.user._id;
    const reviewId = req.params.id;
    await deleteReview(reviewId, userId);
    return res.status(200).json({ msg: 'Review deleted successfully.' });
  } catch (err) {
    return res.status(500).json({ status: false, msg: err.message || 'Server error' });
  }
};

// 4) Get paged reviews by movie id
export const getPagedReviewsByMovieIdHandler = async (req: Request, res: Response): Promise<Response> => {
  const { movieId } = req.params;
  const { page = 1, limit = 10 } = req.query;

  try {
    const reviews = await getPagedReviewsByMovieId(movieId, Number(page), Number(limit));
    return res.status(200).json({ status: true, data: reviews });
  } catch (err) {
    return res.status(500).json({ status: false, msg: err.message || 'Server error' });
  }
};

// 5) Get paged reviews by user id
export const getPagedReviewsByUserIdHandler = async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  const userId = req.user._id;
  const { page = 1, limit = 10 } = req.query;

  try {
    const reviews = await getPagedReviewsByUserId(userId, Number(page), Number(limit));
    return res.status(200).json({ status: true, data: reviews });
  } catch (err) {
    return res.status(500).json({ status: false, msg: err.message || 'Server error' });
  }
};

// 6) seed reviews
export const seedReviewsHandler = async (req: Request, res: Response) => {
  try {
    await seedReviews();
    return res.status(200).json({ status: true, msg: 'Reviews seeded successfully' });
  } catch (err) {
    return res.status(500).json({ status: false, msg: err.message || 'Server error' });
  }
};
