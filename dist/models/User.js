"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    fullName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    profileImage: {
        type: String,
    },
    verified: {
        type: Boolean,
        default: false,
    },
});
exports.default = (0, mongoose_1.model)('User', UserSchema);
//# sourceMappingURL=User.js.map