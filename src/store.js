import { configureStore } from '@reduxjs/toolkit'
import PasteReducer from './redux/PasteSlice'
export default configureStore({
  reducer: {
    paste : PasteReducer
  }
})