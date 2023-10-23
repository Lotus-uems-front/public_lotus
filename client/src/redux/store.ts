import searchSlice  from './searchResult/slice';
import { configureStore } from '@reduxjs/toolkit'
import questionarySlice  from './questionary/slice'
import filterSlice from './filter/slice';
import mapSlice  from './map/slice';

export const store = configureStore({
  reducer: {
    questionary: questionarySlice,
    search: searchSlice,
    filter: filterSlice,
    map: mapSlice
  }
})


export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch