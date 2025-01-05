"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.healthController = void 0;
const moment_1 = __importDefault(require("moment"));
const healthController = (req, res) => {
    res.json({ message: {
            app: "Thumbstack-Todo Server",
            time: (0, moment_1.default)()
        } });
};
exports.healthController = healthController;
