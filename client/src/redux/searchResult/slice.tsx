import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { companiesDataApi } from '../../api/api'
import { InitialStateType, StatusType } from './types'


/**
 * поиск по названию компании
 */
export const fetchSearchByCompanyName = createAsyncThunk(
  'questionary/fetchSearchByName',
  async (searchString: string) => {
    const data = await companiesDataApi.searchByCompanyName(searchString)

    return data
  }
)

/**
 * Поиск по виду деятельности
 */
export const fetchSearchOccupation = createAsyncThunk(
  'questionary/fetchSearchOccupation',
  async (occupation: string) => {
    const data = await companiesDataApi.searchOccupation(occupation)

    return data
  }
)

const initialState: InitialStateType = {
  status: StatusType.LOADING,
  searchByName: [],
  companyOccupation: [],
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {

    searchByCompanyName: (state, action) => {
      state.searchByName = action.payload
    },

    searchOccupation: (state, action) => {
      state.companyOccupation = action.payload
    },
  },

  extraReducers: builder => {

    builder.addCase(fetchSearchByCompanyName.pending, state => {
      state.searchByName = []
      state.status = StatusType.LOADING
    })

    builder.addCase(fetchSearchByCompanyName.fulfilled, (state, action: any) => {
      state.searchByName = action.payload
      state.status = StatusType.SUCCESS
    })

    builder.addCase(fetchSearchByCompanyName.rejected, state => {
      state.searchByName = []
      state.status = StatusType.ERROR
    })

    builder.addCase(fetchSearchOccupation.pending, state => {
      state.searchByName = []
      state.status = StatusType.LOADING
    })

    builder.addCase(fetchSearchOccupation.fulfilled, (state, action: any) => {
      state.companyOccupation = action.payload
      state.status = StatusType.SUCCESS
    })

    builder.addCase(fetchSearchOccupation.rejected, state => {
      state.searchByName = []
      state.status = StatusType.ERROR
    })
  }

})

export const { searchByCompanyName, searchOccupation } = searchSlice.actions

export default searchSlice.reducer