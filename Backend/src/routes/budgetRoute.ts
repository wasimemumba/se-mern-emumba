import express from 'express';
import { addBudgetEntry, deleteBudgetEntry, getBudgetForLastMonth, getBudgetsByDate, getUserBudgets } from '../controller/budgetController';
import validate from '../middleware/validateMiddleware';
import isAuthenticated from '../middleware/isAuthenticated';
import { addBudgetEntrySchema } from '../schema/budgetEntryValidation';


const router = express.Router();


router.route('/')
.get(isAuthenticated,getUserBudgets) // get all budgets of a user should be logged in
.post(isAuthenticated ,validate(addBudgetEntrySchema),addBudgetEntry); // add a budget entry should be logged in and validate the request body
router.route("/date").get(isAuthenticated,getBudgetForLastMonth); // get all budgets for the last/last 6 / last 12 month should be logged in
router.route("/:id").delete(isAuthenticated,deleteBudgetEntry); // delete a budget entry should be logged in
router.route("/:date").get(isAuthenticated,getBudgetsByDate); // get all budgets by date should be logged in



export default router;