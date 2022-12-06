import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import "express-async-errors";
import cookieParser from "cookie-parser";

import connectDB from "./db/dbConnect.js";
import errorHandlerMiddleware from "./middleware/error-handler.js";
import notFoundMiddleware from "./middleware/not-found.js";

import authRouter from "./router/authRouter.js";
import projectRouter from "./router/projectRouter.js";

dotenv.config();
const app = express();
const portNum = process.env.PORT_NUM || 5000;

app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/user", authRouter);
app.use("/api/v1/project", projectRouter);

app.use(notFoundMiddleware);
app.use(errorHandlerMiddleware);

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(portNum, () => console.log(`Server is listening to ${portNum}`));
  } catch (error) {
    console.log(error);
  }
};
start();
