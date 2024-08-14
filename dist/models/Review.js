"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const ReviewSchema = new mongoose_1.Schema({
    text: {
        type: String,
        required: true,
    },
    rating: {
        type: Number,
        required: true,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    movie: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Movie',
        required: true,
    },
});
exports.default = (0, mongoose_1.model)('Review', ReviewSchema);
//# sourceMappingURL=Review.js.map