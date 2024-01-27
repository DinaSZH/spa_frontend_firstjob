import { configureStore } from '@reduxjs/toolkit'
//import filter from './slices/filterSlice'
import authReducer from './slices/authSlice'
import profileReducer from './slices/profileSlice'
export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile:profileReducer,
  },
})


