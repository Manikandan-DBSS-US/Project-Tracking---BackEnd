import { StatusCodes } from "http-status-codes";
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../error/index.js";
import Task from "../model/Task.js";

const createTask = async (req, res) => {
  const {
    name,
    description,
    dueDate,
    effort,
    isCompleted,
    isVerified,
    projectId,
  } = req.body;
  if (
    !name ||
    !description ||
    !dueDate ||
    !effort ||
    !isCompleted ||
    !isVerified ||
    !projectId
  )
    throw new BadRequestError("Please provide all values");
  const task = await Task.create({
    name,
    description,
    dueDate,
    effort,
    isCompleted,
    isVerified,
    projectId,
  });
  res.status(200).json({ msg: "Task Created!", task });
};

const getAllTask = async (req, res) => {
  let result = Task.find({});

  //pagination
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const skip = (page - 1) * limit;
  result = result.skip(skip).limit(limit);
  const tasks = await result;
  const totalTask = await Task.countDocuments();
  const numberOfPages = Math.ceil(totalTask/limit)
  res
    .status(StatusCodes.OK)
    .json({ totalTask,numberOfPages , tasks });
};

const getSpecificTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findById({ _id: id });
  res.status(StatusCodes.OK).json({ task });
};

const updateTask = async (req, res) => {
  const { id } = req.params;
  const {
    name,
    description,
    dueDate,
    effort,
    isCompleted,
    isVerified,
    projectId,
  } = req.body;
  const task = await Task.findOne({ _id: id });
  if (!task) throw new NotFoundError(`No User with id :${id}`);
  //   if (
  //     !name ||
  //     !description ||
  //     !dueDate ||
  //     !effort ||
  //     !isCompleted ||
  //     !isVerified
  //   )
  //     throw new BadRequestError("Please provide all values");
  const updateTask = await Task.findOneAndUpdate(
    { _id: id },
    {
      name,
      description,
      dueDate,
      effort,
      isCompleted,
      isVerified,
      projectId,
    },
    {
      new: true,
    }
  );
  res.status(StatusCodes.OK).json({ updateTask });
};

const deleteTask = async (req, res) => {
  const { id } = req.params;
  const task = await Task.findOne({ _id: id });
  if (!task) throw new NotFoundError(`No User with id :${id}`);
  const deleteTask = await Task.findOneAndDelete({ _id: id });
  res.status(StatusCodes.OK).json({ deleteTask });
};

export { createTask, getAllTask, getSpecificTask, updateTask, deleteTask };
