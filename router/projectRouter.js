import express from "express";
import { CreateProject } from "../controller/projectController.js";
const router = express.Router();

router.route("/create").post(CreateProject);

export default router;