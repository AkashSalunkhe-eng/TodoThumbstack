"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const task_controller_1 = require("../controller/task-controller");
const router = (0, express_1.Router)();
router.post("/add-new-task", task_controller_1.addNewTask);
router.get("/get-all-tasks", task_controller_1.getAllTasks);
router.get("/update-specific-task/", task_controller_1.updateSpecificTask);
router.delete('/delete-specific-task', task_controller_1.deleteSpecificTask);
exports.default = router;
