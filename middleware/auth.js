import jwt from "jsonwebtoken";
import { UnAuthenticatedError } from "../error/index.js";
import { accessTokenValidator } from "../utils/token.js";

const auth = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer")) {
    throw new UnAuthenticatedError("Authentication Invalid");
  }
  try {
    const token = authHeader.split(" ")[1];
    const payload = await accessTokenValidator(token);
    req.user = { userId: payload.id };
    next();
  } catch (error) {
    throw new UnAuthenticatedError("Authentication Invalid")
  }
};

export default auth;
