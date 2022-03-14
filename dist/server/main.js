"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const path_1 = __importDefault(require("path"));
const route_1 = require("../shared/helpers/route");
const app = (0, express_1.default)();
const router = express_1.default.Router();
// Configuration
app.use((0, morgan_1.default)(':method :url :status :res[content-length] - :response-time ms'));
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use(body_parser_1.default.json());
app.use((0, cors_1.default)());
// Routes
// Serve static assets
// paths are relative to package.json
app.get('/', express_1.default.static(path_1.default.resolve('../'), { index: 'index.html' }));
app.get((0, route_1.route)('client').relative, express_1.default.static(path_1.default.resolve('../'), { index: 'index.html' }));
app.get('/js/', express_1.default.static(path_1.default.resolve('../js/'), {
    index: false,
    extensions: ['js'],
}));
app.get('/css/', express_1.default.static(path_1.default.resolve('../css/'), {
    index: false,
    extensions: ['css'],
}));
app.get('*', (req, res) => {
    res.sendStatus(404);
});
// Error handlers
app.use((err, req, res, next) => {
    res
        .status(500)
        .send(err.message || err);
});
app.listen(8888, () => {
    console.info(`API server started on port ${8888}`);
});
