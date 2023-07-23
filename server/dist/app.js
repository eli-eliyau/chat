"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.io = void 0;
const express_1 = __importDefault(require("express"));
const http_1 = __importDefault(require("http"));
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
const connecing_1 = __importDefault(require("./db/connecing"));
const routers_1 = __importDefault(require("./routers/routers"));
const socket_io_2 = __importDefault(require("./socket.io"));
connecing_1.default;
const app = (0, express_1.default)();
const server = http_1.default.createServer(app);
exports.io = new socket_io_1.Server(server, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    },
});
(0, socket_io_2.default)(exports.io);
app.use((0, cors_1.default)({ origin: "http://localhost:3000", credentials: true }));
app.use(express_1.default.json());
app.use("/api", routers_1.default);
server.listen(3001, () => {
    console.log("server is run port 3001");
});
