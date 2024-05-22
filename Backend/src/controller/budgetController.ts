import { NextFunction, Request, Response } from "express";
import budgetServices from "../services/budgetServices";
import mongoose from "mongoose";
import ApiError from "../utils/ApiError";
import { date } from "yup";

export const getUserBudgets = async (req: Request, res: Response,next : NextFunction) => {
    try {
        const budgets = await budgetServices.getBudgetsByUserId(req.user._id);
        res.status(200).json(budgets);
    } catch (err) {
        console.log(err);
        next(err)
    }
}

export const addBudgetEntry = async (req: Request, res: Response , next:NextFunction) => {
    try {
        const {price , name  , date } = req.body;
        const userId = req.user._id;
        const newBudgetEntry = await budgetServices.addBudgetEntry(name, price, userId , date);

        res.status(201).json(newBudgetEntry);
    } catch (error) {  
        console.log(error);
        next(error)
    }    
}


export const getBudgetForLastMonth = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const months = req.query.months ? parseInt(req.query.months as string) : 1;
        const budgets = await budgetServices.getBudgetForLastMonth(req.user._id , months);
        res.status(200).json(budgets);
    } catch (err) {
        console.log(err);
        next(err)
    }

}

export const getBudgetsByDate = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {date} = req.params;
        const budgets = await budgetServices.getBudgetsByDate(date);
        res.status(200).json(budgets);
    } catch (err) { 
        console.log(err);
        next(err)
    }
    
}

export const deleteBudgetEntry = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const {id} = req.params;
        if(! mongoose.Types.ObjectId.isValid(id)){
            throw new ApiError(400,"Invalid id");
        }
        const deletedBudgetEntry = await budgetServices.deleteBudgetEntry(id as unknown as mongoose.Types.ObjectId , req.user._id);
        res.status(200).json(deletedBudgetEntry);
    } catch (error) {
        console.log(error);
        next(error)
    }
}

