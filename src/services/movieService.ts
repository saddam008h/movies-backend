import { data } from '../seed/moviesData';
import Movie, { IMovie } from '../models/Movie';
// import { IMovie } from 'types/allTypes';
import mongoose from 'mongoose';

// 1) Create a new movie
export const createMovie = async (movieData: IMovie) => {
  const existingMovie = await Movie.findOne({ title: movieData.title }); // check title already exists
  if (existingMovie) {
    throw new Error('Movie Title already exists');
  }

  const movie = new Movie(movieData);
  await movie.save();

  return movie;
};

// 2) Retrieve a movie by its ID
export const getMovieById = async (id: string) => {
  const movieObjectId = new mongoose.Types.ObjectId(id);

  const movie = await Movie.aggregate([
    { $match: { _id: movieObjectId } },
    {
      $lookup: {
        from: 'reviews',
        localField: '_id',
        foreignField: 'movie',
        as: 'reviews',
      },
    },
    {
      $addFields: {
        averageRating: { $avg: '$reviews.rating' },
        totalReviews: { $size: '$reviews' },
      },
    },
    {
      $project: {
        _id: 1,
        title: 1,
        description: 1,
        genres: 1,
        videoUrl: 1,
        posterUrl: 1,
        backdropUrl: 1,
        user: 1,
        releaseDate: 1,
        runtime: 1,
        budget: 1,
        revenue: 1,
        averageRating: { $ifNull: ['$averageRating', 0] },
        totalReviews: 1,
      },
    },
  ]);

  // Since we are searching by ID, we expect only one result
  return movie.length > 0 ? movie[0] : null;
};

// 3) Retrieve movies created by the authenticated user
export const getMoviesByUserId = async (userId:string) => {
    const userObjectId = new mongoose.Types.ObjectId(userId);
    const movies = await Movie.aggregate([
      { $match: { user: userObjectId } },
      {
        $lookup: {
          from: 'reviews',
          localField: '_id',
          foreignField: 'movie',
          as: 'reviews',
        },
      },
      {
        $addFields: {
          averageRating: { $avg: '$reviews.rating' },
        },
      },
      {
        $project: {
          _id: 1,
          title: 1,
          description: 1,
          genres: 1,
          videoUrl: 1,
          posterUrl: 1,
          backdropUrl: 1,
          user: 1,
          releaseDate: 1,
          runtime: 1,
          budget: 1,
          revenue: 1,
          averageRating: { $ifNull: ['$averageRating', 0] },
        },
      },
      {
        $sort: { averageRating: -1 },
      },
    ]);

    return movies;
};

// 4) Update a movie with the provided data and user ID
export const updateMovie = async (id: string, userId: string, movieData: Partial<IMovie>) => {
  // Check if the movie exists
  const existingMovie = await Movie.findById(id);
  if (!existingMovie) {
    throw new Error('Movie not found');
  }
  //check authorization
  if (existingMovie.user.toString() !== userId) {
    throw new Error('Not authorized to update this movie');
  }

  // Check if the title is being updated and already exists
  if (movieData.title && movieData.title !== existingMovie.title) {
    const movieWithSameTitle = await Movie.findOne({ title: movieData.title });
    if (movieWithSameTitle) {
      throw new Error('Movie Title already exists');
    }
  }

  // Update the movie with the new data
  Object.keys(movieData).forEach((key) => {
    const k = key as keyof IMovie;
    if (movieData[k] !== null && movieData[k] !== undefined) {
      (existingMovie[k] as any) = movieData[k]!;
    }
  });

  await existingMovie.save();

  return existingMovie;
};

// 5) Delete a movie by its ID
export const deleteMovie = async (id: string, userId: string) => {
  const movieToDelete = await Movie.findById(id);
  if (!movieToDelete) {
    throw new Error('Movie not found');
  }
  //authorization
  if (movieToDelete.user.toString() !== userId) {
    throw new Error('Not authorized to delete this movie');
  }
  return await Movie.findByIdAndDelete(id);
};

// 6) Retrieves all movies from the database
export const getAllMovies = async () => {
  const movies = await Movie.aggregate([
    {
      $lookup: {
        from: 'reviews', 
        localField: '_id',
        foreignField: 'movie', 
        as: 'reviews', 
      },
    },
    {
      $addFields: {
        averageRating: { $avg: '$reviews.rating' },
        totalReviews: { $size: '$reviews' },
      },
    },
    {
      $sort: { averageRating: -1 }, // Sort by average rating in descending order
    },
    {
      $project: {
        _id: 1,
        title: 1,
        description: 1,
        genres: 1,
        videoUrl: 1,
        posterUrl: 1,
        backdropUrl: 1,
        user: 1,
        releaseDate: 1,
        runtime: 1,
        budget: 1,
        revenue: 1,
        averageRating: { $ifNull: ['$averageRating', 0] }, // default to 0 if there are no reviews
        totalReviews: 1, 
      },
    },
  ]);

  return movies;
};


// 7) Retrieve movies by their title
export const getMoviesByTitle = async (title: string) => {
  const movies = await Movie.aggregate([
    { $match: { title: { $regex: new RegExp(title, 'i') } } }, // case-insensitive search
    {
      $lookup: {
        from: 'reviews',
        localField: '_id',
        foreignField: 'movie',
        as: 'reviews',
      },
    },
    {
      $addFields: {
        averageRating: { $avg: '$reviews.rating' },
        totalReviews: { $size: '$reviews' },
      },
    },
    {
      $project: {
        _id: 1,
        title: 1,
        description: 1,
        genres: 1,
        videoUrl: 1,
        posterUrl: 1,
        backdropUrl: 1,
        user: 1,
        releaseDate: 1,
        runtime: 1,
        budget: 1,
        revenue: 1,
        averageRating: { $ifNull: ['$averageRating', 0] },
        totalReviews: 1,
      },
    },
  ]);

  return movies;
};


// 8) Seed movies data
export const seedMovies = async () => {
  // Clear existing data
  await Movie.deleteMany({});

  await Movie.insertMany(data);
};
