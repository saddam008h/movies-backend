"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const reviewController_1 = require("../controllers/reviewController");
const reviewValidation_1 = require("../validations/reviewValidation");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const router = express_1.default.Router();
router.post('/:movieId', authMiddleware_1.default, reviewValidation_1.reviewValidation, reviewController_1.createReviewHandler);
router.put('/:id', authMiddleware_1.default, reviewValidation_1.reviewValidation, reviewController_1.updateReviewHandler);
router.delete('/:id', authMiddleware_1.default, reviewController_1.deleteReviewHandler);
exports.default = router;
//# sourceMappingURL=reviewRoutes.js.map