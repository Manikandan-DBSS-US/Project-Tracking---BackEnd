import jwt from "jsonwebtoken";

const refreshToken = async (payaload) => {
  const token = await jwt.sign(payaload, process.env.REFRESH_JWT_KEY, {
    expiresIn: "7d",
  });
  return token;
};

const refreshTokenValidator = async (token) => {
  const result = await jwt.verify(token, process.env.REFRESH_JWT_KEY);
  return result;
};

const accessToken = async (payload) => {
  const token = await jwt.sign(payload, process.env.ACCESS_JWT_KEY, {
    expiresIn: "1min",
  });
  return token;
};

const accessTokenValidator = async (token) => {
  const result = await jwt.verify(token, process.env.ACCESS_JWT_KEY);
  return result;
};

export {
  refreshToken,
  refreshTokenValidator,
  accessToken,
  accessTokenValidator,
};
