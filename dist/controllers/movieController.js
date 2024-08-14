"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteMovieHandler = exports.updateMovieHandler = exports.getMovieByIdHandler = exports.getAllMoviesHandler = exports.createMovieHandler = void 0;
const express_validator_1 = require("express-validator");
const movieService_1 = require("../services/movieService");
const createMovieHandler = async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { title, releaseDate, posterUrl, videoUrl } = req.body;
    const userId = req.user.id;
    try {
        const movie = await (0, movieService_1.createMovie)(title, releaseDate, posterUrl, videoUrl, userId);
        return res.json(movie);
    }
    catch (err) {
        return res.status(500).send('Server error');
    }
};
exports.createMovieHandler = createMovieHandler;
const getAllMoviesHandler = async (_req, res) => {
    try {
        const movies = await (0, movieService_1.getAllMovies)();
        return res.json(movies);
    }
    catch (err) {
        return res.status(500).send('Server error');
    }
};
exports.getAllMoviesHandler = getAllMoviesHandler;
const getMovieByIdHandler = async (req, res) => {
    try {
        const movie = await (0, movieService_1.getMovieById)(req.params.id);
        if (!movie) {
            return res.status(404).json({ msg: 'Movie not found' });
        }
        return res.json(movie);
    }
    catch (err) {
        return res.status(500).send('Server error');
    }
};
exports.getMovieByIdHandler = getMovieByIdHandler;
const updateMovieHandler = async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { title, releaseDate, posterUrl, videoUrl } = req.body;
    try {
        const movie = await (0, movieService_1.updateMovie)(req.params.id, title, releaseDate, posterUrl, videoUrl);
        return res.json(movie);
    }
    catch (err) {
        return res.status(500).send('Server error');
    }
};
exports.updateMovieHandler = updateMovieHandler;
const deleteMovieHandler = async (req, res) => {
    try {
        await (0, movieService_1.deleteMovie)(req.params.id);
        return res.json({ msg: 'Movie removed' });
    }
    catch (err) {
        return res.status(500).send('Server error');
    }
};
exports.deleteMovieHandler = deleteMovieHandler;
//# sourceMappingURL=movieController.js.map