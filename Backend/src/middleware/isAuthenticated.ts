import {RequestUser} from "../types/User";
declare global { // Declare global namespace
  namespace Express {  // Express namespace
    interface Request {  // Request interface
      user: RequestUser; // Add user property to Request interface
    }
  }
}
import jwt from "jsonwebtoken";
import {Request , Response , NextFunction} from "express";
import RefreshTokenDecoded from "../types/RefreshToken";
import ApiError from "../utils/ApiError";
import httpStatus from "http-status";

//Middleware to check if the user is authenticated
const auth = async (req:Request, res: Response, next : NextFunction ) => { // Create a middleware function
  const token = req.header("Authorization"); // Get the token from the request header
  if (!token) { // If token is not present send a 401 status with the message "Access denied"
    next(new ApiError(httpStatus.UNAUTHORIZED,"Acess denied"));
  }
  try {
    const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_PRIVATE_KEY) as RefreshTokenDecoded; // Verify the token
    req.user = decoded; // Set the user property of the request object to the decoded token
    next(); // Call the next middleware
  } catch (err) { // Catch any errors
    if (err.name === "TokenExpiredError") { // If the error is a TokenExpiredError send a 401 status with the message "Token expired"
      next(new ApiError(httpStatus.UNAUTHORIZED, "Token expired"));
    }
    next(new ApiError(httpStatus.UNAUTHORIZED,"Acess denied")); // If the error is not a TokenExpiredError send a 401 status with the message "Access denied"
  }
};

export default auth;
