"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.feedbacksByUserId = exports.updateFeedback = exports.deleteFeedback = exports.createNewFeedback = exports.feedbackById = exports.getAllFeedbacks = void 0;
const feedbacks_1 = require("../models/feedbacks");
const feedbacks_2 = require("../models/feedbacks");
// GET all feedbacks
const getAllFeedbacks = async (req, res) => {
    try {
        const feedbacks = await (0, feedbacks_1.getFeedbacks)();
        // finding average rating
        const totalFeedbaks = feedbacks.length;
        const totalRating = feedbacks.reduce((acc, feedback) => acc + feedback.rating, 0);
        const averageRating = totalRating / totalFeedbaks;
        //finding number of ratings on their respective rating
        const rating1 = feedbacks.filter((feedback) => feedback.rating === 1).length;
        const rating2 = feedbacks.filter((feedback) => feedback.rating === 2).length;
        const rating3 = feedbacks.filter((feedback) => feedback.rating === 3).length;
        const rating4 = feedbacks.filter((feedback) => feedback.rating === 4).length;
        const rating5 = feedbacks.filter((feedback) => feedback.rating === 5).length;
        //making an array of ratings
        const ratingArray = [rating1, rating2, rating3, rating4, rating5];
        //pagination
        const pageSize = 8;
        const pageNumber = Number(req.query.pageNumber) || 1;
        const feedbacks2 = await feedbacks_2.FeedbackModel.find({})
            .sort({ _id: -1 })
            .populate('user')
            .limit(pageSize)
            .skip(pageSize * (pageNumber - 1));
        const totalPages = Math.ceil(feedbacks.length / pageSize);
        return res.status(200).json({
            status: true,
            msg: 'Feedbacks retrieved successfully',
            data: feedbacks2,
            averageRating,
            ratingArray,
            totalPages,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, msg: 'Something went wrong' });
    }
};
exports.getAllFeedbacks = getAllFeedbacks;
// GET a feedback by ID
const feedbackById = async (req, res) => {
    const feedbackId = req.params.id;
    try {
        const feedback = await (0, feedbacks_1.getFeedbackById)(feedbackId);
        if (!feedback) {
            return res.status(404).json({ status: false, msg: 'Feedback not found' });
        }
        return res.status(200).json({
            status: true,
            msg: 'Feedback retrieved successfully',
            data: feedback,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, msg: 'Something went wrong' });
    }
};
exports.feedbackById = feedbackById;
// CREATE a new feedback
const createNewFeedback = async (req, res) => {
    const { text, city, rating, user } = req.body;
    try {
        const feedback = await (0, feedbacks_1.createFeedback)({ text, city, rating, user });
        return res.status(201).json({
            status: true,
            msg: 'Feedback created successfully',
            data: feedback,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, msg: 'Something went wrong' });
    }
};
exports.createNewFeedback = createNewFeedback;
// DELETE a feedback by ID
const deleteFeedback = async (req, res) => {
    const feedbackId = req.params.id;
    try {
        const deletedFeedback = await (0, feedbacks_1.deleteFeedbackById)(feedbackId);
        if (!deletedFeedback) {
            return res.status(404).json({ status: false, msg: 'Feedback not found' });
        }
        return res.status(200).json({
            status: true,
            msg: 'Feedback deleted successfully',
            data: deletedFeedback,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, msg: 'Something went wrong' });
    }
};
exports.deleteFeedback = deleteFeedback;
// UPDATE a feedback by ID
const updateFeedback = async (req, res) => {
    const feedbackId = req.params.id;
    const { text, city, rating, user } = req.body;
    try {
        const updatedFeedback = await (0, feedbacks_1.updateFeedbackById)(feedbackId, {
            text,
            city,
            rating,
            user,
        });
        if (!updatedFeedback) {
            return res.status(404).json({ status: false, msg: 'Feedback not found' });
        }
        return res.status(200).json({
            status: true,
            msg: 'Feedback updated successfully',
            data: updatedFeedback,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, msg: 'Something went wrong' });
    }
};
exports.updateFeedback = updateFeedback;
// GET feedbacks by user ID
const feedbacksByUserId = async (req, res) => {
    const userId = req.params.userId; // Assuming the parameter name is 'userId'
    try {
        const userFeedbacks = await (0, feedbacks_1.getFeedbacksByUserId)(userId);
        if (!userFeedbacks) {
            return res.status(404).json({ status: false, msg: 'No feedbacks found' });
        }
        return res.status(200).json({
            status: true,
            msg: 'Feedbacks retrieved successfully',
            data: userFeedbacks,
        });
    }
    catch (error) {
        console.error(error);
        return res.status(500).json({ status: false, msg: 'Something went wrong' });
    }
};
exports.feedbacksByUserId = feedbacksByUserId;
//# sourceMappingURL=feedbackController.js.map