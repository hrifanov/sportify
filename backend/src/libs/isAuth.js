import { verifyToken } from "./auth";

export const isAuth = (context, next) => {
  const authorization = context.req.headers["authorization"];

  if (!authorization) {
    throw new Error("not authenticated");
  }

  try {
    const token = authorization.split(" ")[1];
    const payload = verifyToken(token, process.env.ACCESS_TOKEN_SECRET);
    context.payload = payload;
  } catch (err) {
    throw new Error('jwt expired');
  }

  //return next();
  return;
};