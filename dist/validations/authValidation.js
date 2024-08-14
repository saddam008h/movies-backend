"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginValidation = exports.registerValidation = void 0;
const express_validator_1 = require("express-validator");
exports.registerValidation = [
    (0, express_validator_1.check)('fullName', 'fullName is required').not().isEmpty(),
    (0, express_validator_1.check)('email', 'Please include a valid email').isEmail(),
    (0, express_validator_1.check)('password', 'Password must be 6 or more characters').isLength({
        min: 6,
    }),
];
exports.loginValidation = [(0, express_validator_1.check)('email', 'Please include a valid email').isEmail(), (0, express_validator_1.check)('password', 'Password is required').exists()];
//# sourceMappingURL=authValidation.js.map