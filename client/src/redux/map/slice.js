import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { companiesDataApi } from '../../api/api'

export const fetchAllCompanies = createAsyncThunk(
    'map/fetchAllCompanies',
    async () => {
        const response = await companiesDataApi.getCitiesData();
        console.log(response);
        return response
    }
)

const initialState = {
    cities: [],
    status: ''
  }
export const mapSlice = createSlice({
  name: 'map',
  initialState,
  reducers: {
    getCitiesData: (state, action) => {
        state.cities = action.payload
      },
  },

  extraReducers: builder => {
    builder
    .addCase(fetchAllCompanies.pending, (state) => {
        state.cities = []
        state.status = 'Loading'
      })

      .addCase(fetchAllCompanies.fulfilled, (state, action) => {
        state.cities = action.payload
        state.status = 'Success'
      })

      .addCase(fetchAllCompanies.rejected, (state) => {
        state.searchByNameData = []
        state.status = 'Error'
      })
  }


})

export const { getCitiesData } = mapSlice.actions

export default mapSlice.reducer
