import express from 'express';
import { createReviewHandler, updateReviewHandler, deleteReviewHandler, seedReviewsHandler, getPagedReviewsByMovieIdHandler, getPagedReviewsByUserIdHandler } from '../controllers/reviewController';
import { reviewValidation } from '../validations/reviewValidation';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();


router.post('/:movieId', authMiddleware, reviewValidation, createReviewHandler);
router.put('/:id', authMiddleware, reviewValidation, updateReviewHandler);
router.delete('/:id', authMiddleware, deleteReviewHandler);
router.get('/movie/:movieId', getPagedReviewsByMovieIdHandler);
router.get('/user', authMiddleware, getPagedReviewsByUserIdHandler);
router.get('/seed/all', seedReviewsHandler);

export default router;
