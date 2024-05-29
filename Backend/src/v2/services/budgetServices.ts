import { BudgetEntry } from "../model/BudgetEntry"; // Assuming Sequelize BudgetEntry model
import ApiError from "../../utils/ApiError";
import { Op } from "sequelize"; // Sequelize operator
import { User } from "../model/User";

// Function to get all budgets by user id
const getBudgetsByUserId = async (userId: number) => {
    // Return all budgets by user id sorted by date ascending
    return await BudgetEntry.findAll({
        where: { userId },
        order: [['date', 'ASC']]
    });
}

// Function to add a budget entry
const addBudgetEntry = async (name: string, price: number, userId: number, date: string) => {
    try {

        const user = await User.findByPk(userId);
        if (!user) {
            throw new ApiError(404, "User not found");
        }

        // Create a new budget entry
        const budgetEntry = await BudgetEntry.create({
            name,
            price,
            date,
            userId
        });
        return budgetEntry;
    } catch (error) {
        console.log(error);
        throw new ApiError(500, error.message);
    }
}

// Function to get all budgets by date
const getBudgetsByDate = async (date: string) => {
    try {
        // Return all budgets by date sorted by date ascending
        return await BudgetEntry.findAll({
            where: { date },
            order: [['date', 'ASC']]
        });
    } catch (error) {
        console.log(error);
        throw new ApiError(500, error.message);
    }
}

const getBudgetForLastMonth = async (userId: number, months: number = 1) => {
    try {
        const currentDate = new Date();
        const firstDayOfLastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() - months, 1);
        const formattedFirstDayOfLastMonth = `${firstDayOfLastMonth.getFullYear()}-${(firstDayOfLastMonth.getMonth() + 1).toString().padStart(2, '0')}-01`;

        // Query the database for budget entries where the date is greater than or equal to the first day of the last month
        return await BudgetEntry.findAll({
            where: {
                userId,
                date: {
                    [Op.gte]: formattedFirstDayOfLastMonth
                }
            },
            order: [['date', 'ASC']]
        });
    } catch (error) {
        console.log(error);
        throw new ApiError(500, error.message);
    }
}

// Function to delete a budget entry
const deleteBudgetEntry = async (id: number, userId: number) => {
    try {
        const budgetEntry = await BudgetEntry.findByPk(id);
        if (!budgetEntry) {
            throw new ApiError(404, "Budget Entry not found");
        }
        if (budgetEntry.userId !== userId) {
            throw new ApiError(403, "Unauthorized");
        }
        await budgetEntry.destroy();
        return { message: "Deleted successfully" };
    } catch (error) {
        console.log(error);
        throw new ApiError(500, error.message);
    }
}

const budgetServices = { getBudgetsByUserId, addBudgetEntry, deleteBudgetEntry, getBudgetsByDate, getBudgetForLastMonth }

export default budgetServices;
