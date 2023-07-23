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
exports.insertUser = exports.userExist = void 0;
const sUser_1 = __importDefault(require("../schemas/sUser"));
const userExist = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        console.log(req.body);
        const dataUser = yield sUser_1.default.findOne({
            _email: req.body._email,
            _password: req.body._password,
        });
        dataUser ? res.send(dataUser) : res.send(false);
        console.log(dataUser);
    }
    catch (err) {
        console.log(err);
    }
});
exports.userExist = userExist;
const insertUser = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const dataUser = yield new sUser_1.default(req.body);
        dataUser.save();
        dataUser ? res.send(dataUser) : res.send(false);
    }
    catch (err) {
        console.log(err);
    }
});
exports.insertUser = insertUser;
