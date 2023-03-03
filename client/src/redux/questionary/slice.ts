import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { companiesDataApi } from '../../api/api'
import { InitialStateType, StatusType } from './types'

/**
 * Получение всех данных указанной компании
 */
export const fetchPosts = createAsyncThunk(
  'questionary/fetchPostsStatus',
  async (inn: string) => {
    const data = await companiesDataApi.getCompanyData(inn)
    return data
  }
)

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

const initialState: InitialStateType = {
  companyData: [],

  filteredOccupationNames: [],
  filteredCompanyData: [],

  status: StatusType.LOADING,
  inn: '',
  searchByCompanyName: [],
}

export const questionarySlice = createSlice({
  name: 'questionary',
  initialState,
  reducers: {
    getCompanyData: (state, action) => {
      state.companyData = action.payload
    },

    getFilteredOccupationNames: (state, action) => {
      state.filteredOccupationNames = action.payload
    },

    getFilteredCompanyData: (state, action) => {
      state.filteredCompanyData = action.payload
    },

    setInn: (state, action) => {
      state.inn = action.payload
    },

    searchByCompanyName: (state, action) => {
      state.searchByCompanyName = action.payload
    },
  },

  extraReducers: builder => {
    builder.addCase(fetchPosts.pending, state => {
      state.companyData = []
      state.status = StatusType.LOADING
    })

    builder.addCase(fetchPosts.fulfilled, (state, action: any) => {
      state.companyData = action.payload
      state.status = StatusType.SUCCESS
    })

    builder.addCase(fetchPosts.rejected, state => {
      state.companyData = []
      state.status = StatusType.ERROR
    })
  }

})

export const { getCompanyData, getFilteredOccupationNames, getFilteredCompanyData, setInn, searchByCompanyName } = questionarySlice.actions

export default questionarySlice.reducer