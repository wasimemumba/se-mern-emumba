import { Types } from "mongoose";
import { BudgetEntry } from "../model/BudgetEntry";
import ApiError from "../utils/ApiError";
import { User } from "../model/User";
import { MoreThanOrEqual } from "typeorm";


//Function to get all budgets by user id
const getBudgetsByUserId = async (id:number) => {
    //Return all budgets by user id
   const budgetEntries = await BudgetEntry.find({
        where: { user: { id : id }},
        order: { date: 'ASC' }
    });
    return budgetEntries;
}

//Function to add a budget entry
const addBudgetEntry = async (name:string, price:number, userId:number , date : string) => {
    try {
        //Create a new budget entry
        
        const user = await User.findOne({where:{id:userId}});

        if(!user){
            throw new ApiError(404,"User not found");
        }

        const budgetEntry = new BudgetEntry();
        budgetEntry.name = name;
        budgetEntry.price = price;
        budgetEntry.user = user ;
        budgetEntry.date = date;
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
        return await BudgetEntry.find({where : { date : date } , order : { date : 'ASC'}});
    } catch (error) { // Catch any errors and throw an ApiError
        console.log(error);
        throw new ApiError(500,error.message);
    }
}


const getBudgetForLastMonth = async (userId: number , months:number = 1 ) => {
    // Get the budgets for the last month
    try {
        // Get the current date
        const currentDate = new Date();

        // Calculate the first day of the last month
        const firstDayOfLastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - months, 1);

        // Convert the first day of last month to a string in 'YYYY-MM-DD' format
        const formattedFirstDayOfLastMonth = `${firstDayOfLastMonth.getFullYear()}-${(firstDayOfLastMonth.getMonth() + 1).toString().padStart(2, '0')}-01`;

        // Query the database for budget entries where the date is greater than or equal to the first day of the last month
        const budgets = await BudgetEntry.find({
            where: {
                user: {id : userId},
                date: MoreThanOrEqual(formattedFirstDayOfLastMonth)
            },
            order: {
                date: 'ASC'  // Ascending order by date
            }
        });
        return budgets;
    } catch (error) {
        console.log(error);
        throw new ApiError(500, error.message);
    }
}

//Function to delete a budget entry
const deleteBudgetEntry = async (id:number,userId : number) => {
  try {
    const budgetEntry = await BudgetEntry.findOne({where:{id:id , user:{id:userId}}});
 
    if(!budgetEntry){
        throw new ApiError(404,"Budget Entry not found");
    }
    return await BudgetEntry.remove(budgetEntry);
  } catch (error) {
    console.log(error);
    throw new ApiError(500,error.message);
  }
}

const budgetServices = {getBudgetsByUserId,addBudgetEntry,deleteBudgetEntry,getBudgetsByDate,getBudgetForLastMonth}


export default budgetServices;