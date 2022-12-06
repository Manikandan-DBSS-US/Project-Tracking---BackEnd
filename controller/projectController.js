import Project from "../model/Project.js";
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../error/index.js";
import { startSession } from "mongoose";
import { StatusCodes } from "http-status-codes";

const getAllProjects = async (req, res) => {
  const projects = await Project.find({});
  res.status(StatusCodes.OK).json({ projects });
};

const getOneProject = async (req, res) => {
  const { id: projectId } = req.params;
  const project = await Project.findById({ _id: projectId });
  res.status(StatusCodes.OK).json({ project });
};

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
  const project = await Project.create(req.body);
  res.status(StatusCodes.CREATED).json({ project });
};

const UpdateProject = async (req, res) => {
  const { id: projectId } = req.params;
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
  const project = await Project.findOne({ _id: projectId });
  if (!project) {
    throw new NotFoundError(`not available this id : ${projectId}`);
  }
  const updatedProject = await Project.findByIdAndUpdate(
    { _id: projectId },
    req.body,
    {
      new: true,
      runValidators: true,
    }
  );
  res.status(StatusCodes.OK).json({ updatedProject });
};

const deleteProject = async (req, res) => {
  const { id: projectId } = req.params;
  const project = await Project.findOne({ _id: projectId });
  if (!project) {
    throw new NotFoundError(`No job with id :${projectId}`);
  }
  await project.remove();
  res.status(StatusCodes.OK).json({ msg: "Successfully! deleted" });
};

export {
  CreateProject,
  getAllProjects,
  getOneProject,
  UpdateProject,
  deleteProject,
};
