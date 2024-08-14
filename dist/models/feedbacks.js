"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFeedbacksByUserId = exports.updateFeedbackById = exports.deleteFeedbackById = exports.createFeedback = exports.getFeedbackById = exports.getFeedbacks = exports.FeedbackModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
// Feedback Config
const FeedbackSchema = new mongoose_1.default.Schema({
    text: { type: String, required: true },
    city: { type: String, required: true },
    rating: { type: Number, required: true },
    user: { type: mongoose_1.default.Schema.Types.ObjectId, ref: 'User', required: true },
});
exports.FeedbackModel = mongoose_1.default.model('Feedback', FeedbackSchema);
// Feedback Actions
const getFeedbacks = () => exports.FeedbackModel.find().sort({ _id: -1 }).populate('user'); // Populate the user_id field with User data
exports.getFeedbacks = getFeedbacks;
const getFeedbackById = (id) => exports.FeedbackModel.findById(id).populate('user'); // Populate the user_id field with User data
exports.getFeedbackById = getFeedbackById;
const createFeedback = (values) => new exports.FeedbackModel(values).save().then((feedback) => feedback.toObject());
exports.createFeedback = createFeedback;
const deleteFeedbackById = (id) => exports.FeedbackModel.findOneAndDelete({ _id: id });
exports.deleteFeedbackById = deleteFeedbackById;
const updateFeedbackById = (id, values) => exports.FeedbackModel.findByIdAndUpdate(id, values);
exports.updateFeedbackById = updateFeedbackById;
const getFeedbacksByUserId = (userId) => exports.FeedbackModel.find({ user: userId }).sort({ _id: -1 });
exports.getFeedbacksByUserId = getFeedbacksByUserId;
//# sourceMappingURL=feedbacks.js.map