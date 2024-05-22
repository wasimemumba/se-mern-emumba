import generateTokens from "../utils/generateTokens";
import {Request , Response , NextFunction} from "express";
import userServices from "../services/userServices";
import authService from "../services/authService";

export const login = async (req:Request, res: Response, next : NextFunction ) => {
  try {
    const { email, password } = req.body;
    const user = await userServices.loginUserWithEmailAndPassword(email, password);
    const { accessToken, refreshToken } = await generateTokens(user);
    res.status(200).json({
      accessToken,
      refreshToken,
      user,
      message: "Logged in sucessfully",
    });
  } catch (err) {
    console.log("Login Error: ",err);
    next(err);
  }
};

export const refreshToken = async (req:Request, res: Response, next : NextFunction ) => {
  try {
    const accessToken = await authService.getRefreshToken(req.body.refreshToken);
    res.status(200).json({ accessToken });

  } catch (err) {
    next(err);
  }
};

export const logout = async (req:Request, res: Response , next : NextFunction) => {
try {
  const isLoggedOut = await authService.loggedOut(req.body.refreshToken);
  if (isLoggedOut) {
    res.status(200).json({ message: "Logged out successfully" });
  } else {
    res.status(500).json({ message: "Error logging Out" });
  }

} catch (err) {
  next(err)
}

};
