import express from 'express';
import { addBudgetEntry, deleteBudgetEntry, getBudgetForLastMonth, getBudgetsByDate, getUserBudgets } from '../controller/budgetController';
import validate from '../middleware/validateMiddleware';
import isAuthenticated from '../middleware/isAuthenticated';
import { addBudgetEntrySchema } from '../schema/budgetEntryValidation';


const router = express.Router();


router.route('/').get(isAuthenticated,getUserBudgets).post(isAuthenticated ,validate(addBudgetEntrySchema),addBudgetEntry);
router.route("/date").get(isAuthenticated,getBudgetForLastMonth);
router.route("/:id").delete(isAuthenticated,deleteBudgetEntry);
router.route("/:date").get(isAuthenticated,getBudgetsByDate);



export default router;