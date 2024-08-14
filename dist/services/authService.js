"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = exports.registerUser = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const generateToken_1 = require("../utils/generateToken");
const confirmRegisterEmailTemplate_1 = require("../utils/confirmRegisterEmailTemplate");
const sendEmail_1 = require("../utils/sendEmail");
const tokens_1 = require("../models/tokens");
const jwtSecret = 'your_jwt_secret';
const registerUser = async (fullName, email, password) => {
    const existingUser = await User_1.default.findOne({ email });
    if (existingUser) {
        if (!existingUser.verified) {
            await User_1.default.findByIdAndDelete(existingUser._id);
        }
        else {
            throw new Error('Email already exists');
        }
    }
    const salt = await bcrypt_1.default.genSalt(10);
    const bcryptPassword = await bcrypt_1.default.hash(password, salt);
    const user = new User_1.default({
        fullName,
        email,
        password: bcryptPassword,
    });
    const token = (0, generateToken_1.generateToken)({ _id: user._id, email: user.email });
    await (0, tokens_1.createToken)({ userId: user._id, token });
    // sending confirmation email
    const send_to = email;
    const sent_from = process.env.EMAIL_USER;
    const subject = 'WatchMyMovies - Please confirm your registration';
    let link = '';
    if (process.env.NODE_ENV === 'production') {
        link = `${process.env.SERVER_PATH_PROD}/api/auth/email-confirmation?token=${token}`;
    }
    else {
        link = `${process.env.SERVER_PATH_DEV}/api/auth/email-confirmation?token=${token}`;
    }
    const message = (0, confirmRegisterEmailTemplate_1.confirmRegisterEmailTemplate)(link, fullName);
    const result = await (0, sendEmail_1.sendEmail)(subject, message, send_to, sent_from);
    if (!result) {
        await User_1.default.findByIdAndDelete(user._id);
        throw new Error('Unable to send confirmation email');
    }
    return {
        _id: user._id,
        name: user.fullName,
        email: user.email,
        verified: user.verified,
        image: user.profileImage,
        token: token,
    };
};
exports.registerUser = registerUser;
const loginUser = async (email, password) => {
    const user = await User_1.default.findOne({ email });
    if (!user) {
        throw new Error('Invalid credentials');
    }
    const isMatch = await bcrypt_1.default.compare(password, user.password);
    if (!isMatch) {
        throw new Error('Invalid credentials');
    }
    const payload = {
        user: {
            id: user.id,
        },
    };
    return jsonwebtoken_1.default.sign(payload, jwtSecret, { expiresIn: '1h' });
};
exports.loginUser = loginUser;
//# sourceMappingURL=authService.js.map