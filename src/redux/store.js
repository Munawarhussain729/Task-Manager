'use client'
import { configureStore } from '@reduxjs/toolkit'
import taskReducer from '../redux/Slices/TaskSlice'

export const store = configureStore({
  reducer: {
    'taskReducer':taskReducer
  },
})