import generateTokens from "../utils/generateTokens";
import {Request , Response , NextFunction} from "express";
import userServices from "../services/userServices";
import authService from "../services/authService";

//Login User
export const login = async (req:Request, res: Response, next : NextFunction ) => {
  try {
    const { email, password } = req.body; // get email and password from request body
    const user = await userServices.loginUserWithEmailAndPassword(email, password); // call the loginUserWithEmailAndPassword function from userServices
    const { accessToken, refreshToken } = await generateTokens(user); // generate access and refresh tokens
    res.status(200).json({ // send the response
      accessToken,
      refreshToken,
      user,
      message: "Logged in sucessfully",
    });
  } catch (err) {
    // catch any errors and pass them to the error handling middleware
    console.log("Login Error: ",err);
    next(err);
  }
};

//Refresh token controller to get new access token
export const refreshToken = async (req:Request, res: Response, next : NextFunction ) => {
  try {
    const accessToken = await authService.getRefreshToken(req.body.refreshToken); // get new access token
    res.status(200).json({ accessToken }); // send the response

  } catch (err) { // catch any errors and pass them to the error handling middleware
    next(err);
  }
};


//Logout controller to log out user
export const logout = async (req:Request, res: Response , next : NextFunction) => {
try {
  const isLoggedOut = await authService.loggedOut(req.body.refreshToken); // call the loggedOut function from authService and get a boolean resposne if the user is logged out
  if (isLoggedOut) { // if logged out successfully send the response
    res.status(200).json({ message: "Logged out successfully" });
  } else { // if not send an error response
    res.status(500).json({ message: "Error logging Out" });
  }

} catch (err) { // catch any errors and pass them to the error handling middleware
  next(err)
}

};
