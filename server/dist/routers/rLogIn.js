"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cUsers_1 = require("../controller/cUsers");
const cAllUsers_1 = require("../controller/cAllUsers");
const router = (0, express_1.Router)();
router.post("/signIn", cUsers_1.userExist);
router.post("/signUp", cUsers_1.insertUser);
router.get("/getAllUsers", cAllUsers_1.getAllUsers);
exports.default = router;
