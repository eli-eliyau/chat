"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.genToken = void 0;
const mongoose_1 = __importStar(require("mongoose"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
let numRoom = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
// 2. Create a Schema corresponding to the document interface.
const userSchema = new mongoose_1.Schema({
    _fullName: { type: String, required: true },
    _email: { type: String, required: true },
    _password: { type: String, required: true },
    _token: { type: String },
    _room: { type: Number, default: numRoom },
    _connected: { type: Boolean, default: false },
    _id_socket_io: { type: String },
    _dade_created: {
        type: Date,
        default: Date.now(),
    },
});
const UsersSchema = mongoose_1.default.model("users", userSchema);
const genToken = (userId) => {
    let token = jsonwebtoken_1.default.sign({ _id: userId }, "ELI", { expiresIn: "1mins" });
    return token;
};
exports.genToken = genToken;
exports.default = UsersSchema;
