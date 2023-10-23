import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { companiesDataApi, URL } from '../../api/api'

export const fetchFilteredInns = createAsyncThunk('filter/fetchFilteredInns', async (obj: Object) => {
  try {
    const data = await companiesDataApi.getFilterData(obj)
    return data
  } catch (err) {
    console.log(`Ошибка в slise.tsx::: `, err)
  }
})

const initialState = {
    filteredInns: [],
    filteredCompanies: [],
    equipmentData: {},
    filterParams: []
}

export const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
   setFilteredCompanies: (state, action) => {
    state.filteredCompanies = action.payload
   },

   setEquipmentData: (state, action) => {
    state.equipmentData = action.payload
   },

   setFilterParams: (state, action) => {
    state.filterParams = action.payload
   }
  },

  extraReducers: builder => {
    builder.addCase(fetchFilteredInns.pending, state => {
      state.filteredInns = []
    })

    builder.addCase(fetchFilteredInns.fulfilled, (state, action: any) => {
      state.filteredInns = action.payload.inn
    })

    builder.addCase(fetchFilteredInns.rejected, state => {
      state.filteredInns = []
    })
  }


})

export const { setFilteredCompanies, setEquipmentData, setFilterParams } = filterSlice.actions

export default filterSlice.reducer
