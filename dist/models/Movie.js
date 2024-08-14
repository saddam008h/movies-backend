"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const MovieSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    releaseDate: {
        type: Date,
        required: true,
    },
    posterUrl: {
        type: String,
    },
    videoUrl: {
        type: String,
    },
    user: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    reviews: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: 'Review',
        },
    ],
});
exports.default = (0, mongoose_1.model)('Movie', MovieSchema);
//# sourceMappingURL=Movie.js.map