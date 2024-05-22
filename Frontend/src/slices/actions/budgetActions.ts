import { createAsyncThunk } from "@reduxjs/toolkit"; // Importing createAsyncThunk function from Redux Toolkit
import ax from "../../api/ax"; // Importing axios instance
import { removeUser } from "../userSlice"; // Importing action creator for removing user

// Async thunk to fetch user budgets
export const getBudgets = createAsyncThunk(
    'budgets/getBudgets', // Action type string
    async (date: string | null, { rejectWithValue, dispatch }) => { // Async function to fetch budgets with optional date parameter
        try {
            let url = '/budget/'; // Default URL to fetch budgets
            if (date) { // If date parameter is provided, update URL to fetch budgets for specific date
                url = `/budget/${date}`;
            }
            const response = await ax.get(url); // Fetch budgets data from the API
            console.log(response.data); // Log fetched data to console
            return response.data; // Return fetched budgets data
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error : any) { // Catch any errors that occur during fetching
            if (error.response && error.response.status === 401) { // If response status is 401 (Unauthorized)
                // Clear user data from local storage and Redux store
                localStorage.removeItem('user');
                localStorage.removeItem('token');
                localStorage.removeItem('refreshToken');
                dispatch(removeUser()); // Dispatch action to remove user from Redux store
            }
            return rejectWithValue(error); // Reject the promise with the error value
        }
    }
);

