import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { companiesDataApi } from '../../api/api'
import { InitialStateType, StatusType } from './types'

//поиск по названию компании
export const fetchSearchByCompanyName = createAsyncThunk('search/fetchSearchByName', async (dataSearch: Object) => {
  try {
    const data = await companiesDataApi.searchByCompanyName(dataSearch)

    return data
  } catch (err) {
    console.log(`Ошибка в slise.tsx::: `, err)
  }
})

//Поиск по виду деятельности
export const fetchSearchOccupation = createAsyncThunk('search/fetchSearchOccupation', async (occupation: Object) => {
  try {
    const data = await companiesDataApi.searchOccupation(occupation)
    return data
  } catch (err) {
    console.log(`Ошибка в slise.tsx::: `, err)
  }
})



const initialState: InitialStateType = {
  status: StatusType.LOADING,
  searchByNameResult: [],
  searchByOccupationResult: [],
  currentPage: 1,
  iconUrl: ''
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    searchByCompanyName: (state, action) => {
      state.searchByNameResult = action.payload
    },

    searchOccupation: (state, action) => {
      state.searchByOccupationResult = action.payload
    },

    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },

    setIconUrl: (state, action) => {
      state.iconUrl = action.payload
    }
  },

  extraReducers: (builder) => {
    builder.addCase(fetchSearchByCompanyName.pending, (state) => {
      state.searchByNameResult = []
      state.status = StatusType.LOADING
    })

    builder.addCase(fetchSearchByCompanyName.fulfilled, (state, action: any) => {
      state.searchByNameResult = action.payload
      state.status = StatusType.SUCCESS
    })

    builder.addCase(fetchSearchByCompanyName.rejected, (state) => {
      state.searchByNameResult = []
      state.status = StatusType.ERROR
    })

    builder.addCase(fetchSearchOccupation.pending, (state) => {
      state.searchByNameResult = []
      state.status = StatusType.LOADING
    })

    builder.addCase(fetchSearchOccupation.fulfilled, (state, action: any) => {
      state.searchByOccupationResult = action.payload
      state.status = StatusType.SUCCESS
    })

    builder.addCase(fetchSearchOccupation.rejected, (state) => {
      state.searchByNameResult = []
      state.status = StatusType.ERROR
    })
  }
})

export const { searchByCompanyName, searchOccupation, setCurrentPage, setIconUrl } = searchSlice.actions

export default searchSlice.reducer
