"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const body_parser_1 = __importDefault(require("body-parser"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const compression_1 = __importDefault(require("compression"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const db_1 = __importDefault(require("./config/db"));
// routes
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const movieRoutes_1 = __importDefault(require("./routes/movieRoutes"));
const reviewRoutes_1 = __importDefault(require("./routes/reviewRoutes"));
//develpment or production
const clientPath_1 = __importDefault(require("./utils/clientPath"));
dotenv_1.default.config();
const app = (0, express_1.default)();
app.use((0, cors_1.default)({
    credentials: true,
    origin: clientPath_1.default,
}));
app.use((0, compression_1.default)()); // compress HTTP responses for faster transmission
app.use((0, cookie_parser_1.default)()); // make cookies available in the req.cookies object
app.use(body_parser_1.default.json());
//db integration
(0, db_1.default)();
//use routes
app.use('/api/auth', authRoutes_1.default);
app.use('/api/movies', movieRoutes_1.default);
app.use('/api/reviews', reviewRoutes_1.default);
//test route
app.get('/', (req, res) => {
    res.send('Hello World! From Recapeo');
});
const server = http_1.default.createServer(app);
server.listen(8000, () => {
    console.log('Server running on http://localhost:8000/');
});
//# sourceMappingURL=index.js.map