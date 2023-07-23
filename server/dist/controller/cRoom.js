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
exports.updateNumRoom = void 0;
const sUser_1 = __importDefault(require("../schemas/sUser"));
const updateNumRoom = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    let usersToUpdate = req.body;
    try {
        const user1 = yield sUser_1.default.findOne({ _id: req.body[0]._id }).select("_room");
        const user2 = yield sUser_1.default.findOne({ _id: req.body[1]._id }).select("_room");
        let numRoom = Math.floor(Math.random() * (100 - 1 + 1)) + 1;
        (user1 === null || user1 === void 0 ? void 0 : user1._room) != (user2 === null || user2 === void 0 ? void 0 : user2._room) &&
            usersToUpdate.map((_id) => __awaiter(void 0, void 0, void 0, function* () {
                return yield sUser_1.default.updateOne({ _id: _id }, { _room: numRoom });
            }));
        const room = yield sUser_1.default.findOne({
            _id: req.body[1]._id,
        }).select("_room");
        console.log(55);
        room ? res.json(room._room) : res.send(false);
    }
    catch (error) {
        console.log(error);
    }
});
exports.updateNumRoom = updateNumRoom;
