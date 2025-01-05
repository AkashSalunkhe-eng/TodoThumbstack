"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const config_controller_1 = require("../controller/config-controller");
const router = (0, express_1.Router)();
router.get("/health", config_controller_1.healthController);
exports.default = router;
