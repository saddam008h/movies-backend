"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMovie = exports.updateMovie = exports.getMovieById = exports.getAllMovies = exports.createMovie = void 0;
const Movie_1 = __importDefault(require("../models/Movie"));
const createMovie = async (title, releaseDate, posterUrl, videoUrl, userId) => {
    const movie = new Movie_1.default({
        title,
        releaseDate,
        posterUrl,
        videoUrl,
        user: userId,
    });
    await movie.save();
    return movie;
};
exports.createMovie = createMovie;
const getAllMovies = async () => {
    return await Movie_1.default.find().populate('user', 'username');
};
exports.getAllMovies = getAllMovies;
const getMovieById = async (id) => {
    return await Movie_1.default.findById(id).populate('user', 'username').populate('reviews');
};
exports.getMovieById = getMovieById;
const updateMovie = async (id, title, releaseDate, posterUrl, videoUrl) => {
    return await Movie_1.default.findByIdAndUpdate(id, { title, releaseDate, posterUrl, videoUrl }, { new: true });
};
exports.updateMovie = updateMovie;
const deleteMovie = async (id) => {
    return await Movie_1.default.findByIdAndDelete(id);
};
exports.deleteMovie = deleteMovie;
//# sourceMappingURL=movieService.js.map