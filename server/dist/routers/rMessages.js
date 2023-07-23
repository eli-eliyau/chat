"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cMessages_1 = require("../controller/cMessages");
const router = (0, express_1.Router)();
router.post("/setMessage", cMessages_1.setMessage);
exports.default = router;
