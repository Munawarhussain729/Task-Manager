'use client'
import { configureStore } from '@reduxjs/toolkit'
import taskReducer from '../redux/Slices/TaskSlice'
import userReducer from '../redux/Slices/UserSlice'

export const store = configureStore({
  reducer: {
    'taskReducer':taskReducer,
    'userReducer':userReducer
  },
})