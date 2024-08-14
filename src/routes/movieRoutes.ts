import express from 'express';
import {
  createMovieHandler,
  getAllMoviesHandler,
  getMovieByIdHandler,
  updateMovieHandler,
  deleteMovieHandler,
  seedMoviesHandler,
  getMoviesByUserIdHandler,
  getMoviesByTitleHandler,
} from '../controllers/movieController';
import { movieValidation } from '../validations/movieValidation';
import authMiddleware from '../middlewares/authMiddleware';

const router = express.Router();

router.post('/', authMiddleware, movieValidation, createMovieHandler);
router.get('/', getAllMoviesHandler);
router.get('/search/:title', getMoviesByTitleHandler);
router.get('/user', authMiddleware, getMoviesByUserIdHandler);
router.get('/:id', getMovieByIdHandler);
router.put('/:id', authMiddleware, movieValidation, updateMovieHandler);
router.delete('/:id', authMiddleware, deleteMovieHandler);

router.get('/seed/all', seedMoviesHandler);

export default router;
