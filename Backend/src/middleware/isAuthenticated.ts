import {RequestUser} from "../types/User";
declare global {
  namespace Express {
    interface Request {
      user: RequestUser;
    }
  }
}
import jwt from "jsonwebtoken";
import {Request , Response , NextFunction} from "express";
import RefreshTokenDecoded from "../types/RefreshToken";
import ApiError from "../utils/ApiError";
import httpStatus from "http-status";

const auth = async (req:Request, res: Response, next : NextFunction ) => {
  const token = req.header("Authorization");
  if (!token) {
    next(new ApiError(httpStatus.UNAUTHORIZED,"Acess denied"));
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY) as RefreshTokenDecoded;
    req.user = decoded;
    next();
  } catch (err) {
    if (err.name === "TokenExpiredError") {
      next(new ApiError(httpStatus.UNAUTHORIZED, "Token expired"));
    }
    next(new ApiError(httpStatus.UNAUTHORIZED,"Acess denied"));
  }
};

export default auth;
