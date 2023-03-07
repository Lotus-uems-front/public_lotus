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
  companyData: [],

  filteredOccupationNames: [],
  filteredCompanyData: [],

  status: StatusType.LOADING,
  inn: '',
  searchByName: [],
  companyOccupation: [],
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
      state.searchByName = action.payload
    },

    searchOccupation: (state, action) => {
      state.companyOccupation = action.payload
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

export const { getCompanyData, getFilteredOccupationNames, getFilteredCompanyData, setInn, searchByCompanyName, searchOccupation } = questionarySlice.actions

export default questionarySlice.reducer