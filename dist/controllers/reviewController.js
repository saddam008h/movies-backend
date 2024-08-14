"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteReviewHandler = exports.updateReviewHandler = exports.createReviewHandler = void 0;
const express_validator_1 = require("express-validator");
const reviewService_1 = require("../services/reviewService");
const createReviewHandler = async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { text, rating } = req.body;
    const userId = req.user.id;
    const movieId = req.params.movieId;
    try {
        const review = await (0, reviewService_1.createReview)(text, rating, userId, movieId);
        return res.json(review);
    }
    catch (err) {
        return res.status(500).send('Server error');
    }
};
exports.createReviewHandler = createReviewHandler;
const updateReviewHandler = async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { text, rating } = req.body;
    try {
        const review = await (0, reviewService_1.updateReview)(req.params.id, text, rating);
        return res.json(review);
    }
    catch (err) {
        return res.status(500).send('Server error');
    }
};
exports.updateReviewHandler = updateReviewHandler;
const deleteReviewHandler = async (req, res) => {
    try {
        await (0, reviewService_1.deleteReview)(req.params.id);
        return res.json({ msg: 'Review removed' });
    }
    catch (err) {
        return res.status(500).send('Server error');
    }
};
exports.deleteReviewHandler = deleteReviewHandler;
//# sourceMappingURL=reviewController.js.map