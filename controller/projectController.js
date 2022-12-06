import Project from "../model/Project.js";
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../error/index.js";
import { startSession } from "mongoose";
import { StatusCodes } from "http-status-codes";

const CreateProject = async (req, res) => {
  const {
    projectName,
    projectDescription,
    clientName,
    projectStartDate,
    projectEndDate,
    technologiesUsed,
  } = req.body;

  if (
    !projectName ||
    !projectDescription ||
    !clientName ||
    !projectStartDate ||
    !projectEndDate ||
    !technologiesUsed
  ) {
    throw new BadRequestError("Please Provide All Values");
  }
  const data = await Project.create(req.body);
  res.status(StatusCodes.CREATED).json({ data });
};

export { CreateProject };
