import { createSlice } from '@reduxjs/toolkit'; // Importing createSlice function from Redux Toolkit
import type { PayloadAction } from '@reduxjs/toolkit'; // Importing PayloadAction type from Redux Toolkit
import toast from 'react-hot-toast'; // Importing toast notifications library
import Budget from '../types/Budget'; // Importing Budget type
import { getBudgets } from './actions/budgetActions'; // Importing getBudgets async action

// Interface for budgets slice state
export interface userState {
    budgets: Budget[]; // Array of budgets
    loading: boolean; // Loading indicator
    error: string; // Error message
}

// Initial state for budgets slice
const initialState: userState = {
    error: '', // Initial error message
    loading: false, // Initial loading state
    budgets: [] // Initial empty array of budgets
};

// Creating budgets slice using createSlice
export const budgetsSlice = createSlice({
    name: 'budgets', // Slice name
    initialState, // Initial state
    reducers: {
        // Reducer to add a budget to the state
        addBudget: (state, action: PayloadAction<Budget>) => {
            state.budgets = state.budgets ? [...state.budgets, action.payload] : [action.payload];
        },
        // Reducer to remove a budget from the state
        removeBudget: (state, action: PayloadAction<string>) => {
            state.budgets = state.budgets?.filter(budget => budget._id !== action.payload);
        }
    },
    // Extra reducers to handle async actions using builder
    extraReducers(builder) {
        builder
            // Pending action for fetching budgets
            .addCase(getBudgets.pending, (state) => {
                state.loading = true; // Set loading to true
                state.error = ''; // Clear error message
                state.budgets = []; // Clear budgets array
            })
            // Fulfilled action for fetching budgets
            .addCase(getBudgets.fulfilled, (state, action: PayloadAction<Budget[]>) => {
                state.loading = false; // Set loading to false
                state.error = ''; // Clear error message
                state.budgets = action.payload; // Update budgets array with fetched data
            })
            // Rejected action for fetching budgets
            .addCase(getBudgets.rejected, (state, action: PayloadAction<unknown>) => {
                state.loading = false; // Set loading to false
                // Get error message from action payload and update state
                
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                state.error = (action.payload as any).response.data.message;
                // Display error toast notification
                toast.error(state.error);
            });
    },
});

// Exporting actions from budgets slice
export const { addBudget, removeBudget } = budgetsSlice.actions;

// Exporting budgets reducer
export default budgetsSlice.reducer;
