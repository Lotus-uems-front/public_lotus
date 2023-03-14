import searchSlice  from './searchResult/slice';
import { configureStore } from '@reduxjs/toolkit'
import questionarySlice  from './questionary/slice'

export const store = configureStore({
  reducer: {
    questionary: questionarySlice,
    search: searchSlice
  }
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch