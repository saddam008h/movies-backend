"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const authController_previous_1 = require("../controllers/authController_previous");
const router = express_1.default.Router();
router.post('/register', authController_previous_1.register);
router.post('/login', authController_previous_1.login);
// router.post('/googlelogin', google)
router.get('/email-confirmation', authController_previous_1.emailConfirmation);
exports.default = router;
//# sourceMappingURL=AuthRoute.js.map