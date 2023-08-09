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
const ids = new Map();
const connectedUsers = new Map();
const message = new Map();
const socketIo = (io) => {
    io.on("connection", (socket) => {
        console.log("eli", `${socket.id}`);
        socket.on('userConnected', (userId) => __awaiter(void 0, void 0, void 0, function* () {
            connectedUsers.set(userId, socket.id);
            console.log(connectedUsers);
            socket.emit('userStatusUpdate', userId, true); // Notify all users about the status change
            const updatedUser = yield sUser_1.default.findByIdAndUpdate(userId, { $set: { _connected: true } });
            if (!updatedUser) {
                console.log('User not found.');
                return;
            }
            console.log('Updated User:', updatedUser);
        }));
        const userId = socket.id;
        ids.set("id", userId);
        onlineUsers.set("id", userId);
        socket.on("send_message", (data) => {
            message.set(userId, data);
            socket.broadcast.emit("receive_message", data);
        });
        socket.on('file', (data) => {
            const fileName = data.fileName;
            const fileData = data.fileData;
            const filePath = path_1.default.join(__dirname, 'uploadedFiles', fileName); // Change to your desired directory
            fs_1.default.writeFileSync(filePath, Buffer.from(fileData));
            console.log('File received and saved:', fileName);
            // Broadcast the file to all connected clients except the sender
            socket.broadcast.emit('file', {
                fileName,
                fileData: fs_1.default.readFileSync(filePath).toString('base64'),
            });
        });
        socket.on("join_room", (data) => {
            console.log("join room num", data);
            socket.join(data);
        });
        socket.on("send_messageAndRoom", (data) => {
            socket.to(data.numRoom).emit("receive_room", data);
        });
        // socket.on("disconnect", () => {
        //   // console.log(userId);
        //   // Remove the user's connection information
        //   onlineUsers.delete(userId);
        // });
        socket.on('disconnect', () => __awaiter(void 0, void 0, void 0, function* () {
            for (const [userId, id] of connectedUsers.entries()) {
                if (id === socket.id) {
                    connectedUsers.delete(userId);
                    const updatedUser = yield sUser_1.default.findByIdAndUpdate(userId, { $set: { _connected: false } });
                    if (!updatedUser) {
                        console.log('User not found.');
                        return;
                    }
                    // console.log('Updated User:', updatedUser);
                    console.log(connectedUsers);
                    io.emit('userStatusUpdate', userId, false); // Notify all users about the status change
                    break;
                }
            }
        }));
    });
};
exports.default = socketIo;
