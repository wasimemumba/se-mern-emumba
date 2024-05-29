import { NextFunction, Request, Response } from "express";
import { User } from "../model/User"; // Importing User model
import userServices from "../services/userServices"; // Importing user services
import ApiError from "../../utils/ApiError"; // Importing custom error class

// Controller function to get all users
export const getUsers = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Fetch all users from the database
    const users = await User.findAll();

    // Send the users as a response
    res.send(users);
  } catch (error) {
    // If an error occurs, send a 500 status with the error message
    res.status(500).send({ message: error.message });
  }
};

// Controller function to create a new user
export const createUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Destructure request body to extract required fields
    const { name, email, password, budgetLimit } = req.body;

    // Call service function to create a new user
    const user = await userServices.createNewUser(name, email, password, budgetLimit);

    // Return the newly created user with a 201 status code
    return res.status(201).json(user);
  } catch (error) {
    // Pass any error to the error handling middleware
    next(error);
  }
};

// Controller function to get a user by ID
export const getUserById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // Call service function to get user by ID
    const user = await userServices.getUserById(req.params.id);

    // If user is not found, throw a 404 error
    if (!user) {
      throw new ApiError(404, "User not found");
    }

    // Send the user as a response
    res.send(user);
  } catch (error) {
    // Pass any error to the error handling middleware
    next(error);
  }
};
