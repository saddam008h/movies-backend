// import { IMovie } from './../types/allTypes';
import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import { createMovie, getAllMovies, getMovieById, updateMovie, deleteMovie, seedMovies, getMoviesByUserId, getMoviesByTitle } from '../services/movieService';
import { AuthenticatedRequest } from 'middlewares/authenticatedRequest';
import { IMovie } from 'models/Movie';

// 1) Handles creating a new movie with the provided data.
export const createMovieHandler = async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(500).json({ status: false, msg: errors.array()[0].msg });
  }
  try {
    const { title, description, releaseDate, runtime, budget, revenue, posterUrl, backdropUrl, videoUrl, genres } = req.body;
    const userId = req.user._id

    // Filter out null values
    const movieData:IMovie = {
      title,
      description,
      releaseDate,
      runtime,
      budget,
      revenue,
      posterUrl,
      backdropUrl,
      videoUrl,
      genres,
      user:userId,
    };

    // Remove keys with null values
    Object.keys(movieData).forEach((key) => {
      const k = key as keyof IMovie;
      if (!k) {
        delete movieData[k];
      }
    });

    const movie = await createMovie(movieData);

    return res.status(200).json({ status: true, msg: 'Movie created successfully', data: movie });
  } catch (err:any) {
    return res.status(500).json({ status: false, msg: err.message || 'Server error' });
  }
};

// 2) Retrieves all movies from the database.
export const getAllMoviesHandler = async (_req: Request, res: Response): Promise<Response> => {
  try {
    const movies = await getAllMovies();
    return res.status(200).json({ status: true, msg: 'Movies get successfully.', data: movies });
  } catch (err:any) {
    return res.status(500).json({ status: false, msg: err.message || 'Server error' });
  }
};

// 3) Retrieves a movie by its ID.
export const getMovieByIdHandler = async (req: Request, res: Response): Promise<Response> => {
  try {
    const movie = await getMovieById(req.params.id);
    if (!movie) {
      return res.status(404).json({ msg: 'Movie not found' });
    }
    return res.status(200).json({ status: true, msg: 'Get Movie By Id', data: movie });
  } catch (err:any) {
    return res.status(500).json({ status: false, msg: err.message || 'Server error' });
  }
};

// 4) Retrieves movies created by the authenticated user.
export const getMoviesByUserIdHandler = async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  try {
    const userId = req.user._id;
  
    const movies = await getMoviesByUserId(userId);

    if (!movies || movies.length === 0) {
      return res.status(404).json({ msg: 'No movies found for the user' });
    }

    return res.status(200).json({ status: true, msg: 'Get Movies By User Id', data: movies });
  } catch (err:any) {
    return res.status(500).json({ status: false, msg: err.message || 'Server error' });
  }
};

// 5) Updates a movie with the provided data and user ID.
export const updateMovieHandler = async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: false, msg: errors.array()[0].msg });
  }

  try {
    const { id } = req.params;
    const { title, description, releaseDate, runtime, budget, revenue, posterUrl, backdropUrl, videoUrl, genres } = req.body;
    const userId = req.user._id;

    // Filter out null values
    const movieData: Partial<IMovie> = {
      title,
      description,
      releaseDate,
      runtime,
      budget,
      revenue,
      posterUrl,
      backdropUrl,
      videoUrl,
      genres,
      user: userId,
    };

    // Remove keys with null values
    Object.keys(movieData).forEach((key) => {
      const k = key as keyof IMovie;
      if (movieData[k] === null || movieData[k] === undefined) {
        delete movieData[k];
      }
    });

    const updatedMovie = await updateMovie(id,userId, movieData);

    return res.status(200).json({ status: true, msg: 'Movie updated successfully', data: updatedMovie });
  } catch (err: any) {
    return res.status(500).json({ status: false, msg: err.message || 'Server error' });
  }
};

// 6) Deletes a movie by its ID.
export const deleteMovieHandler = async (req: AuthenticatedRequest, res: Response): Promise<Response> => {
  const userId = req.user._id;
  try {
    await deleteMovie(req.params.id, userId);
    return res.status(200).json({ status: true, msg: 'Movie is deleted successfully.' });
  } catch (err:any) {
    return res.status(500).json({ status: false, msg: err.message || 'Server error' });
  }
};


// 7) Retrieves movies by their title.
export const getMoviesByTitleHandler = async (req: Request, res: Response): Promise<Response> => {
  try {
    const { title } = req.params;
    const movies = await getMoviesByTitle(title);
    if (!movies || movies.length === 0) {
      return res.status(404).json({ msg: 'No movies found' });
    }
    return res.status(200).json({ status: true, msg: 'Get Movies By Title', data: movies });
  } catch (err: any) {
    return res.status(500).json({ status: false, msg: err.message || 'Server error' });
  }
};



// 8) Seeds the database with new movies.
export const seedMoviesHandler = async (req:Request, res:Response) => {
  try {
    // Seed new movies
    await seedMovies();
    res.status(200).json({ message: 'Seed successful' });
  } catch (err:any) {
    console.error('Error seeding database:', err);
    res.status(500).json({ message: 'Error seeding database', error: err.message });
  }
};

