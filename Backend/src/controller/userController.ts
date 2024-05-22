import { NextFunction, Request, Response } from "express";
import { User } from "../model/User";
import { addToCache, getFromCache } from "../utils/cache";
import userServices from "../services/userServices";
import ApiError from "../utils/ApiError";

export const getUsers = async (req:Request, res: Response, next : NextFunction ) => {
  try {
    const users = await User.find();

    res.send(users);
  } catch (error) {
    res.status(500).send({ message: error.message });
  }
};

export const createUser = async (req:Request, res: Response, next : NextFunction ) => {
  try {
    const {name , email ,password , budgetLimit} = req.body
    const user = await userServices.createNewUser( name , email , password , budgetLimit);
    return res.status(201).json(user);

  } catch (error) {
    next(error);
  }

};

export const getUserById = async (req:Request, res: Response, next : NextFunction ) => {
  try {

    const user = await userServices.getUserById(req.params.id);
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    res.send(user);
  } catch (error) {
    next(error);
  }
};