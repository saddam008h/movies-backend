"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReview = exports.updateReview = exports.createReview = void 0;
const Review_1 = __importDefault(require("../models/Review"));
const Movie_1 = __importDefault(require("../models/Movie"));
const createReview = async (text, rating, userId, movieId) => {
    const review = new Review_1.default({ text, rating, user: userId, movie: movieId });
    await review.save();
    const movie = await Movie_1.default.findById(movieId);
    if (movie) {
        movie.reviews.push(review.id);
        await movie.save();
    }
    return review;
};
exports.createReview = createReview;
const updateReview = async (id, text, rating) => {
    return await Review_1.default.findByIdAndUpdate(id, { text, rating }, { new: true });
};
exports.updateReview = updateReview;
const deleteReview = async (id) => {
    const review = await Review_1.default.findById(id);
    if (review) {
        const movie = await Movie_1.default.findById(review.movie);
        if (movie) {
            movie.reviews = movie.reviews.filter((reviewId) => reviewId.toString() !== id);
            await movie.save();
        }
    }
    return await Review_1.default.findByIdAndDelete(id);
};
exports.deleteReview = deleteReview;
//# sourceMappingURL=reviewService.js.map