import { Router } from "express";
import { addNewTask, deleteSpecificTask, getAllTasks, updateSpecificTask } from "../controller/task-controller";
// import} from "../middleware/auth";

const router = Router();

router.post("/add-new-task",  addNewTask);
router.get("/get-all-tasks", getAllTasks);
router.put("/update-specific-task", updateSpecificTask);
router.delete('/delete-specific-task', deleteSpecificTask);

export default router;