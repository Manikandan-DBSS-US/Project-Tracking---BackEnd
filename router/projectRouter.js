import express from "express";
import {
  CreateProject,
  deleteProject,
  getAllProjects,
  getOneProject,
  UpdateProject,
} from "../controller/projectController.js";
const router = express.Router();

router.route("/create").post(CreateProject);
router.route("/getAllProjects").get(getAllProjects);
router.route("/getOneProject/:id").get(getOneProject);
router.route("/update/:id").put(UpdateProject);
router.route("/delete/:id").delete(deleteProject);

export default router;
