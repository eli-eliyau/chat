"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cUsers_1 = require("../controller/cUsers");
const router = (0, express_1.Router)();
router.post("/signIn", cUsers_1.getUser);
exports.default = router;
