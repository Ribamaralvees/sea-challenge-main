import { configureStore } from '@reduxjs/toolkit'
import employeesReducer from './slices/employeesSlice'
import stepsReducer from './slices/stepsSlice'

export const store = configureStore({
  reducer: {
    employees: employeesReducer,
    steps: stepsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
