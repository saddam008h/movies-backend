"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.movieValidation = void 0;
const express_validator_1 = require("express-validator");
exports.movieValidation = [
    (0, express_validator_1.check)('title', 'Title is required').not().isEmpty(),
    (0, express_validator_1.check)('releaseDate', 'Release date is required').not().isEmpty(),
    (0, express_validator_1.check)('posterUrl', 'Poster URL is required').not().isEmpty(),
    (0, express_validator_1.check)('videoUrl', 'Video URL is required').not().isEmpty(),
];
//# sourceMappingURL=movieValidation.js.map