import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slices/userSlice'
import budgetsReducer from './slices/budgetSlice'

export const store = configureStore({
  reducer: {
    userState : userReducer,
    budgetsState : budgetsReducer
  },
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch