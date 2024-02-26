import { configureStore } from '@reduxjs/toolkit'
import todoReducer from './slices/todosSlice'

export default configureStore({
  reducer: {
    todos: todoReducer,
  }
})