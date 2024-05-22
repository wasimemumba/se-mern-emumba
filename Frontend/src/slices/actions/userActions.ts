import { createAsyncThunk } from "@reduxjs/toolkit"; // Importing createAsyncThunk function from Redux Toolkit
import ax from "../../api/ax"; // Importing axios instance
import { LoginDTO } from "../../types/LoginDTO"; // Importing LoginDTO type

// Async thunk to login user
export const loginUser = createAsyncThunk(
    'user/loginUser', // Action type string
    async (user: { email: string, password: string }, { rejectWithValue }) => { // Async function to login user with email and password
        try {
            const response = await ax.post("/auth", { // Making POST request to login endpoint
                email: user.email, // Email from user object
                password: user.password // Password from user object
            });
            console.log(response); // Logging response data to console

            if (response.status === 200) { // If response status is 200 (OK)
                return response.data as LoginDTO; // Return response data as LoginDTO
            }
        } catch (error) { // Catch any errors that occur during login process
            return rejectWithValue(error); // Reject the promise with the error value
        }
    }
);
