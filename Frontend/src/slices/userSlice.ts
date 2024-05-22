import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import type { User } from "../types/User"
import { loginUser } from './actions/userActions';
import { LoginDTO } from '../types/LoginDTO';
import toast from 'react-hot-toast';
import { updateAuthToken } from '../api/ax';


export interface userState {
    user: User | null; 
    loading: boolean;
    error: string;
}

const initialState: userState = {
    error: '',
    loading: false,
    user: JSON.parse(localStorage.getItem('user') || 'null')
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    removeUser : (state) => {
        state.user = null;
        state.error = '';
        state.loading = false;
    }
  },
  extraReducers(builder) {
        builder.addCase(loginUser.pending, (state) => {
            state.loading = true;
            state.error = '';
        }),
        builder.addCase(loginUser.fulfilled, (state, action: PayloadAction<LoginDTO | undefined >) => {
            state.loading = false;
            state.user = action.payload?.user || null // Add null check for action.payload
            state.error = '';
            localStorage.setItem('user', JSON.stringify(state.user));
            localStorage.setItem('token', action.payload?.accessToken || '');
            localStorage.setItem('refreshToken', action.payload?.refreshToken || '');
            updateAuthToken()
            toast.success('Login successful');
        }),
        builder.addCase(loginUser.rejected, (state, action: PayloadAction<unknown>) => {
            state.loading = false;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            state.error = (action.payload as any ).response.data.message;
            toast.error(state.error);
        })
      },
    })

    // Action creators are generated for each case reducer function
    export const {removeUser } = userSlice.actions

    export default userSlice.reducer
