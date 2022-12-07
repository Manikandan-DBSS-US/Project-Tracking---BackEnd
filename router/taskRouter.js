import express from 'express';
import { createTask, deleteTask, getAllTask, getSpecificTask, updateTask } from '../controller/taskController.js';

const router = express.Router();



router.route("/create-task").post(createTask);
router.route("/").get(getAllTask);
router.route("/:id").get(getSpecificTask).put(updateTask).delete(deleteTask);


export default router;