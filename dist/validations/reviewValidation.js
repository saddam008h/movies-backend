"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.reviewValidation = void 0;
const express_validator_1 = require("express-validator");
exports.reviewValidation = [(0, express_validator_1.check)('text', 'Text is required').not().isEmpty(), (0, express_validator_1.check)('rating', 'Rating is required').not().isEmpty()];
//# sourceMappingURL=reviewValidation.js.map