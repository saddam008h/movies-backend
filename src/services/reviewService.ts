import Review, { IReview } from '../models/Review';
import Movie from '../models/Movie';
import { reviewsData } from '../seed/reviewsData';

// 1) Create a new review
export const createReview = async (text: string, rating: number, userId: string, movieId: string): Promise<IReview> => {

  // check if movie exists
  const movieExists = await Movie.findById(movieId);
  if (!movieExists) {
    throw new Error('Movie not found');
  }

  const review = new Review({ text, rating, user: userId, movie: movieId });

  await review.save();

  return review;
};

// 2) Update a review with the provided data and user ID
export const updateReview = async (id: string, text: string, rating: number, userId:string): Promise<IReview> => {
  const review = await Review.findById(id);
  // check if review exists
  if (!review) {
    throw new Error('Review not found');
  }
  // check if user is authorised to update review
  if (review.user.toString() !== userId) {
    throw new Error('You are not authorised to update this review');
  }

  return await Review.findByIdAndUpdate(id, { text, rating }, { new: true });
};

// 3) Delete a review by its ID
export const deleteReview = async (id: string, userId:string): Promise<IReview> => {
  // check if review exists
  const review = await Review.findById(id);
  if (!review) {
    throw new Error('Review not found');
  }

  // check authorization
  if (review.user.toString() !== userId) {
    throw new Error('You are not authorised to delete this review');
  }

  return await Review.findByIdAndDelete(id);
};

// 4) Get paged reviews by movie id
export const getPagedReviewsByMovieId = async (movieId: string, page: number, limit: number) => {
  const skip = (page - 1) * limit;
  const totalReviews = await Review.countDocuments({ movie: movieId });
  const totalPages = Math.ceil(totalReviews / limit);

  const reviews = await Review.find({ movie: movieId })
    .skip(skip)
    .limit(limit)
    .populate('user', 'fullName'); // Populate the user field with the name only

  return {
    totalReviews,
    totalPages,
    currentPage: page,
    pageSize: limit,
    reviews,
  };
};


// 5) Get paged reviews by user id
export const getPagedReviewsByUserId = async (userId: string, page: number, limit: number) => {
  const skip = (page - 1) * limit;
  const totalReviews = await Review.countDocuments({ user: userId });
  const totalPages = Math.ceil(totalReviews / limit);

  const reviews = await Review.find({ user: userId }).skip(skip).limit(limit).populate('movie', 'title'); // Populating the movie field with only the title

  return {
    totalReviews,
    totalPages,
    currentPage: page,
    pageSize: limit,
    reviews,
  };
};



// 6) seed reviews
export const seedReviews = async () => {
  // Clear existing data
  await Review.deleteMany({});

  await Review.insertMany(reviewsData);
};
