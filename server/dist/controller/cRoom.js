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
        if ((user1 === null || user1 === void 0 ? void 0 : user1._room) !== (user2 === null || user2 === void 0 ? void 0 : user2._room)) {
            yield Promise.all(usersToUpdate.map((_id) => {
                return sUser_1.default.findOneAndUpdate({ _id: _id }, { _room: numRoom }, { new: true });
            }));
        }
        const room = yield sUser_1.default.findOne({ _id: req.body[1]._id }).select("_room");
        room ? res.send(`${room._room}`) : res.status(404).send('Room not found');
    }
    catch (error) {
        res.status(500).send(error);
    }
});
exports.updateNumRoom = updateNumRoom;
