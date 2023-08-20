"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sUser_1 = __importDefault(require("../schemas/sUser"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const onlineUsers = new Map();
const connectedUsers = new Map();
const message = new Map();
const socketIo = (io) => {
    io.on("connection", (socket) => {
        console.log("eli", `${socket.id}`);
        socket.on('userConnected', (userId) => __awaiter(void 0, void 0, void 0, function* () {
            connectedUsers.set(userId, socket.id);
            console.log(connectedUsers);
            const updatedUser = yield sUser_1.default.findByIdAndUpdate(userId, { $set: { _connected: true } });
            if (!updatedUser) {
                console.log('User not found.');
                return;
            }
            // console.log('Updated User:', updatedUser);
        }));
        const userId = socket.id;
        onlineUsers.set("id", userId);
        socket.on("send_message", (data) => {
            message.set(userId, data);
            socket.broadcast.emit("receive_message", data);
        });
        socket.on("join_room", (data) => {
            console.log("join room num", data);
            socket.join(data);
        });
        socket.on("send_messageAndRoom", (data) => {
            socket.to(data.numRoom).emit("receive_room", data);
        });
        socket.on('file_upload', (file) => {
            console.log(`Received file: ${file.name}, size: ${file.data.byteLength} bytes`);
            const filePath = path_1.default.join(`C:\\fullstack\\projects\\Chat Application\\chat\\server\\src\\public`, 'uploads', file.name);
            const buffer = Buffer.from(file.data);
            fs_1.default.writeFileSync(filePath, buffer);
            fs_1.default.readFile(filePath, (err, data) => {
                if (err) {
                    console.error('Error reading file:', err);
                    return;
                }
                io.emit('download_file', { user: file.user, userTo: file.userTo, name: file.name, data, date: file.date });
            });
        });
        socket.on('disconnect', () => __awaiter(void 0, void 0, void 0, function* () {
            for (const [userId, id] of connectedUsers.entries()) {
                if (id === socket.id) {
                    connectedUsers.delete(userId);
                    const updatedUser = yield sUser_1.default.findByIdAndUpdate(userId, { $set: { _connected: false } });
                    if (!updatedUser) {
                        console.log('User not found.');
                        return;
                    }
                    console.log(connectedUsers);
                    break;
                }
            }
        }));
    });
};
exports.default = socketIo;
