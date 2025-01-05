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
exports.deleteSpecificTask = exports.updateSpecificTask = exports.getAllTasks = exports.addNewTask = void 0;
const Tasks_1 = __importDefault(require("../models/Tasks"));
const addNewTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { title, description, status, dueDate } = req.body;
        const newTask = new Tasks_1.default({ title, description, status, dueDate });
        const savedTask = yield newTask.save();
        res.status(201).json(savedTask);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to create task" });
    }
});
exports.addNewTask = addNewTask;
const getAllTasks = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const tasks = yield Tasks_1.default.find().sort({ createdAt: -1 });
        res.status(200).json(tasks);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to fetch tasks" });
    }
});
exports.getAllTasks = getAllTasks;
const updateSpecificTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.query.id;
        const updates = req.body;
        const updatedTask = yield Tasks_1.default.findByIdAndUpdate(id, updates, { new: true });
        if (!updatedTask) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.status(200).json(updatedTask);
    }
    catch (err) {
        res.status(500).json({ error: "Failed to update task" });
    }
});
exports.updateSpecificTask = updateSpecificTask;
const deleteSpecificTask = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const id = req.query.id;
        const deletedTask = yield Tasks_1.default.findByIdAndDelete(id);
        if (!deletedTask) {
            return res.status(404).json({ error: "Task not found" });
        }
        res.status(200).json({ message: "Task deleted successfully" });
    }
    catch (err) {
        res.status(500).json({ error: "Failed to delete task" });
    }
});
exports.deleteSpecificTask = deleteSpecificTask;
