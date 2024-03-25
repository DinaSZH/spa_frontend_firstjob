import { configureStore } from '@reduxjs/toolkit'
//import filter from './slices/filterSlice'
import authReducer from './slices/authSlice'
import profileReducer from './slices/profileSlice'
import resumeReducer from './slices/resumeSlice'
import vacancyReducer from './slices/vacancySlice'
import applyReducer from './slices/applySlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    profile:profileReducer,
    resume: resumeReducer,
    vacancy: vacancyReducer,
    apply: applyReducer,
  },
})


