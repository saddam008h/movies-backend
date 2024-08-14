"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const express_validator_1 = require("express-validator");
const authService_1 = require("../services/authService");
const register = async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { fullName, email, password } = req.body;
    try {
        const user = await (0, authService_1.registerUser)(fullName, email, password);
        return res.status(200).json({ msg: 'User registered successfully', data: user });
    }
    catch (err) {
        console.error(err.message);
        return res.status(500).json({ msg: 'Server error' });
    }
};
exports.register = register;
const login = async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { email, password } = req.body;
    try {
        const token = await (0, authService_1.loginUser)(email, password);
        return res.json({ token });
    }
    catch (err) {
        return res.status(400).json({ errors: [{ msg: err.message }] });
    }
};
exports.login = login;
//# sourceMappingURL=authController.js.map