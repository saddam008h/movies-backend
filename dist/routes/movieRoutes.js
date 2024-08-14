"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const movieController_1 = require("../controllers/movieController");
const movieValidation_1 = require("../validations/movieValidation");
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const router = express_1.default.Router();
router.post('/', authMiddleware_1.default, movieValidation_1.movieValidation, movieController_1.createMovieHandler);
router.get('/', movieController_1.getAllMoviesHandler);
router.get('/:id', movieController_1.getMovieByIdHandler);
router.put('/:id', authMiddleware_1.default, movieValidation_1.movieValidation, movieController_1.updateMovieHandler);
router.delete('/:id', authMiddleware_1.default, movieController_1.deleteMovieHandler);
exports.default = router;
//# sourceMappingURL=movieRoutes.js.map