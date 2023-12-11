"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cUsers_1 = require("../controller/cUsers");
const cAllUsers_1 = require("../controller/cAllUsers");
const cMessages_1 = require("../controller/cMessages");
const cRoom_1 = require("../controller/cRoom");
const cNotification_1 = require("../controller/cNotification");
const router = (0, express_1.Router)();
router.post("/signIn", cUsers_1.userExist);
router.post("/signUp", cUsers_1.insertUser);
router.post("/getAllUsers", cAllUsers_1.getAllUsers);
router.post("/setMessage", cMessages_1.setMessage);
router.post("/numRoom", cRoom_1.updateNumRoom);
router.post("/numRoom", cRoom_1.updateNumRoom);
router.post("/notification", cNotification_1.sendNotification);
exports.default = router;
