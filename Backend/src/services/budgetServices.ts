import { Types } from "mongoose";
import { BudgetEntry } from "../model/BudgetEntry";
import ApiError from "../utils/ApiError";


//Function to get all budgets by user id
const getBudgetsByUserId = async (id:Types.ObjectId) => {
    //Return all budgets by user id
    return await BudgetEntry.find({user:id}).sort({date : 'asc'});
}

//Function to add a budget entry
const addBudgetEntry = async (name:string, price:number, userId:Types.ObjectId , date : string) => {
    try {
        //Create a new budget entry
        const budgetEntry = new BudgetEntry({
            name,
            price,
            date, 
            user : userId
        });
        //Save the budget entry
        return await budgetEntry.save();
    } catch (error) { // Catch any errors and throw an ApiError
        console.log(error);
        throw new ApiError(500, error.message);
    
    }

}


//Function to get all budgets by date
const getBudgetsByDate = async (date:string) => { 
    try {
        //Return all budgets by date
        return await BudgetEntry.find({date :  date} ).sort({date : 'asc'});
    } catch (error) { // Catch any errors and throw an ApiError
        console.log(error);
        throw new ApiError(500,error.message);
    }
}


const getBudgetForLastMonth = async (userId: Types.ObjectId , months:number = 1 ) => {
    // Get the budgets for the last month
    try {
        // Get the current date
        const currentDate = new Date();

        // Calculate the first day of the last month
        const firstDayOfLastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - months, 1);

        // Convert the first day of last month to a string in 'YYYY-MM-DD' format
        const formattedFirstDayOfLastMonth = `${firstDayOfLastMonth.getFullYear()}-${(firstDayOfLastMonth.getMonth() + 1).toString().padStart(2, '0')}-01`;

        // Query the database for budget entries where the date is greater than or equal to the first day of the last month
        const budgets = await BudgetEntry.find({ user: userId, date: { $gte: formattedFirstDayOfLastMonth } }).sort({ date: 'asc' });

        return budgets;
    } catch (error) {
        console.log(error);
        throw new ApiError(500, error.message);
    }
}

//Function to delete a budget entry
const deleteBudgetEntry = async (id:Types.ObjectId,userId : Types.ObjectId) => {
  try {
    const budgetEntry = await BudgetEntry.findById(id);
    if(!budgetEntry){
        throw new ApiError(404,"Budget Entry not found");
    }
    if(budgetEntry.user.toString() !== userId.toString()){
        throw new ApiError(403,"Unauthorized");
    }
    return await BudgetEntry.findByIdAndDelete(id);
  } catch (error) {
    console.log(error);
    throw new ApiError(500,error.message);
  }
}

const budgetServices = {getBudgetsByUserId,addBudgetEntry,deleteBudgetEntry,getBudgetsByDate,getBudgetForLastMonth}


export default budgetServices;