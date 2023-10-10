'use client'
import { configureStore } from '@reduxjs/toolkit'
import taskReducer from '../redux/Slices/TaskSlice'
import userReducer from '../redux/Slices/UserSlice'
import projectReducer from '../redux/Slices/ProjectSlice'

export const store = configureStore({
  reducer: {
    'taskReducer':taskReducer,
    'userReducer':userReducer,
    'projectReducer':projectReducer
  },
})