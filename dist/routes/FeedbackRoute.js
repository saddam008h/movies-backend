"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const feedbackController_1 = require("../controllers/feedbackController"); // Replace with the correct path to your feedback controller
const router = express_1.default.Router(); // "api/feedback"
// GET all feedbacks
router.get('/', feedbackController_1.getAllFeedbacks);
// GET a feedback by ID
router.get('/:id', feedbackController_1.feedbackById);
// CREATE a new feedback
router.post('/', feedbackController_1.createNewFeedback);
// DELETE a feedback by ID
router.delete('/:id', feedbackController_1.deleteFeedback);
// UPDATE a feedback by ID
router.put('/:id', feedbackController_1.updateFeedback);
// get feedbacks by user id
router.get('/user/:userId', feedbackController_1.feedbacksByUserId);
exports.default = router;
//# sourceMappingURL=FeedbackRoute.js.map