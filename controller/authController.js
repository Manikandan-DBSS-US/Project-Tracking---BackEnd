import User from "../model/User.js";
import moment from 'moment'
import {
  BadRequestError,
  NotFoundError,
  UnAuthenticatedError,
} from "../error/index.js";
import { StatusCodes } from "http-status-codes";
import { hashPassword, hashValidator } from "../utils/hashPassword.js";
import {
  accessToken,
  refreshToken,
  refreshTokenValidator,
} from "../utils/token.js";

const register = async (req, res) => {
  const {
    userName,
    firstName,
    lastName,
    email,
    password,
    dateOfBirth,
    gender,
    phoneNumber,
    role,
    isActive,
  } = req.body;
  if (
    !userName ||
    !firstName ||
    !lastName ||
    !password ||
    !email ||
    !dateOfBirth ||
    !gender ||
    !phoneNumber
  )
    throw new BadRequestError("Please provide all values");
  const userExist = await User.findOne({ email });
  if (userExist) throw new BadRequestError("Email already in use");
  const userNameExist = await User.findOne({ userName });
  if (userExist) throw new BadRequestError("User Name already in use");

  if (password.length < 6)
    throw new BadRequestError("Password must be more than 6 characters");
  const hashedPassword = await hashPassword(password);
  console.log({ hashedPassword });

  const user = await User.create({
    userName,
    firstName,
    lastName,
    email,
    password: hashedPassword,
    dateOfBirth,
    gender,
    phoneNumber,
    role,
    isActive,
  });
  res.status(StatusCodes.CREATED).json({ msg: "Register Success!" });
};

const login = async (req, res) => {
  const { userName, password } = req.body;
  if (!userName || !password)
    throw new BadRequestError("Please provide all values");
  const userExist = await User.findOne({ userName });
  if (!userExist) throw new UnAuthenticatedError("username does not exist");
  const isPasswordCorrect = await hashValidator(password, userExist.password);
  if (!isPasswordCorrect)
    throw new UnAuthenticatedError("Enter correct password");
  const refresh_token = await refreshToken({ id: userExist._id });
  console.log({ refresh_token, userExist });

  res.cookie("refreshtoken", refresh_token, {
    httpOnly: true,
    path: "/api/v1/user/refresh_token",
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });

  res.status(StatusCodes.CREATED).json({ userExist });
};

const getAccessToken = async (req, res) => {
  const rf_token = req.cookies.refreshtoken;
  if (!rf_token) throw new UnAuthenticatedError("Please login now!");
  const userValidation = await refreshTokenValidator(rf_token);
  if (!userValidation) throw new UnAuthenticatedError("Please login now!");
  const access_token = await accessToken({ id: userValidation.id });
  res.status(StatusCodes.CREATED).json({ access_token });
};

const logout = async (req, res) => {
  res.clearCookie("refreshtoken", {
    path: "/api/v1/user/refresh_token",
  });
  res.status(StatusCodes.OK).json({ msg: "Logged out!" });
};

const getAlluser = async (req, res) => {
  const users = await User.find({}).select("-password");
  res.status(StatusCodes.OK).json({ users });
};

const getSpecificUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findById({ _id: id });
  res.status(StatusCodes.OK).json({ user });
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const {
    firstName,
    lastName,
    email,
    dateOfBirth,
    gender,
    phoneNumber,
    role,
    isActive,
  } = req.body;
  const user = await User.findOne({ _id: id });
  if (!user) throw new NotFoundError(`No User with id :${id}`);
  if (
    !firstName ||
    !lastName ||
    !email ||
    !dateOfBirth ||
    !gender ||
    !phoneNumber
  )
    throw new BadRequestError("Please provide all values");
  console.log(req.body);
  const updatedUser = await User.findOneAndUpdate(
    { _id: id },
    {
      firstName,
      lastName,
      email,
      dateOfBirth,
      gender,
      phoneNumber,
      role,
      isActive,
    },
    {
      new: true,
    }
  ).select("-password");
  res.status(StatusCodes.OK).json({ updatedUser });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await User.findOne({ _id: id });
  if (!user) throw new NotFoundError(`No User with id :${id}`);
  const deletedUser = await User.findOneAndDelete({ _id: id });
  res.status(StatusCodes.OK).json({ deletedUser });
};

export {
  register,
  login,
  getAccessToken,
  logout,
  getAlluser,
  getSpecificUser,
  updateUser,
  deleteUser,
};
