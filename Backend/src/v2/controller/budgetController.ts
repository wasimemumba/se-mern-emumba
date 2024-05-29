import { NextFunction, Request, Response } from "express";
import budgetServices from "../services/budgetServices";
import mongoose from "mongoose";
import ApiError from "../../utils/ApiError";

//Get all budgets Controller
export const getUserBudgets = async (req: Request, res: Response,next : NextFunction) => {
    try {
        //We get the user id from the request object beacuse of out auth middleware
        const budgets = await budgetServices.getBudgetsByUserId(req.user._id); //Get all budgets by user id
        res.status(200).json(budgets); // send the response as array of budgets
    } catch (err) { // catch any errors and pass them to the error handling middleware
        console.log(err);
        next(err)
    }
}

//Add Budget Entry Controller
export const addBudgetEntry = async (req: Request, res: Response , next:NextFunction) => {
    try {
        const {price , name  , date } = req.body; // get the price , name and date from the request body
        const userId = req.user._id; // get the user id from the request object whic is present beacuse of out auth middleware
        const newBudgetEntry = await budgetServices.addBudgetEntry(name, price, userId , date); // call the addBudgetEntry function from budgetServices

        res.status(201).json(newBudgetEntry); // send the response as the new budget entry
    } catch (error) {   // catch any errors and pass them to the error handling middleware
        console.log(error);
        next(error)
    }    
}


export const getBudgetForLastMonth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const months = req.query.months ? parseInt(req.query.months as string) : 1;  // get the months from the query params if not present set it to 1
        const budgets = await budgetServices.getBudgetForLastMonth(req.user._id , months); // call the getBudgetForLastMonth function from budgetServices
        res.status(200).json(budgets); // send the response as array of budgets
    } catch (err) { // catch any errors and pass them to the error handling middleware
        console.log(err);
        next(err)
    }

}

//Get Budgets by date Controller
export const getBudgetsByDate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {date} = req.params; // get the date from the request params
        const budgets = await budgetServices.getBudgetsByDate(date); // call the getBudgetsByDate function from budgetServices which returns all budgets by date
        res.status(200).json(budgets);  // send the response as array of budgets
    } catch (err) {  // catch any errors and pass them to the error handling middleware
        console.log(err);
        next(err)
    }
    
}

//Delete Budget Entry Controller
export const deleteBudgetEntry = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params; // get the id from the request params
        if(! mongoose.Types.ObjectId.isValid(id)){ // check if the id is a valid mongoose id
            throw new ApiError(400,"Invalid id"); // if not throw an error
        }
        const deletedBudgetEntry = await budgetServices.deleteBudgetEntry(id as unknown as number , req.user._id); // call the deleteBudgetEntry function from budgetServices
        res.status(200).json(deletedBudgetEntry); // send the response as the deleted budget entry
    } catch (error) {   // catch any errors and pass them to the error handling middleware
        console.log(error);
        next(error)
    }
}

