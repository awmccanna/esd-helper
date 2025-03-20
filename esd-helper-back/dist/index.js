"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const applicationRoutes_1 = __importDefault(require("./routes/applicationRoutes"));
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
const port = 8080;
app.use((0, cors_1.default)({
    origin: 'http://localhost:3000',
}));
app.use(express_1.default.json());
app.use('/api', applicationRoutes_1.default);
app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
