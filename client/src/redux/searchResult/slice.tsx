import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { companiesDataApi, URL } from '../../api/api'
import { InitialStateType, StatusType } from './types'

//поиск по названию компании
export const fetchSearchByCompanyName = createAsyncThunk('search/fetchSearchByName', async (dataSearch: Object) => {
  try {
    const data = await companiesDataApi.searchByCompanyName(dataSearch)
console.log(data);

    return data
  } catch (err) {
    console.log(`Ошибка в slise.tsx::: `, err)
  }
})

export const fetchCompaniesLengthName = createAsyncThunk('search/fetchCompaniesLengthName', async (dataSearch: Object) => {
  try {
    const response = await companiesDataApi.getCompaniesLengthName(dataSearch)
    console.log(response);
    
    const data = response
    if (!data) {
      throw new Error('Data is not defined on the response object')
    }
    return data
  } catch (err) {
    console.log('Ошибка в slise.tsx:::', err)
    return { length: 0 }
  }
})

//Поиск по виду деятельности
export const fetchSearchOccupation = createAsyncThunk('search/fetchSearchOccupation', async (occupation: Object) => {
  try {
    const response = await companiesDataApi.searchOccupation(occupation)
    const data = (response as { data: any[]; length: number }).data

    if (!data) {
      throw new Error('Data is not defined on the response object')
    }
    console.log({ data: data, length: response.length } as { data: any[]; length: number })

    return { data: data, length: response.length } as { data: any[]; length: number }
  } catch (err) {
    console.log('Ошибка в slise.tsx:::', err)
    return { data: [], length: 0 }
  }
})

export const fetchCompaniesLength = createAsyncThunk('search/fetchCompaniesLength', async (occupation: Object) => {
  try {
    const response = await companiesDataApi.getCompaniesLength(occupation)
    const data = response
    if (!data) {
      throw new Error('Data is not defined on the response object')
    }
    return data
  } catch (err) {
    console.log('Ошибка в slise.tsx:::', err)
    return { length: 0 }
  }
})

export const loadImageUrl = createAsyncThunk('search/loadImageUrl', async (login, fileName) => {
  try {
    let urlIcon
    const user = 'Leonid'
    if (URL === 'http://localhost:5000') {
      urlIcon = await companiesDataApi.getIcon(`C:/Users/semen/OneDrive/Рабочий стол/server/uems-uploads/icons/${login}_${fileName}.jpg`)
    } else {
      urlIcon = await companiesDataApi.getIcon(`/home/${user}/uems-uploads/icons/${login}_${fileName}.jpg`)
    }
    // console.log(`${urlIcon}`); // test
    return urlIcon
  } catch (err) {
    console.log(`Ошибка::: `, err)
    return null
  }
})

const initialState: InitialStateType = {
  status: StatusType.LOADING,
  searchByNameResult: [],
  searchByOccupationResult: [],
  currentPage: 1,
  iconUrl: '',
  companiesCount: 0,
  companiesCountName: 0
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    searchByCompanyName: (state, action) => {
      state.searchByNameResult = action.payload
    },

    searchOccupation: (state, action) => {
      state.searchByOccupationResult = action.payload.data
    },

    setCurrentPage: (state, action) => {
      state.currentPage = action.payload
    },

    setIconUrl: (state, action) => {
      state.iconUrl = action.payload
    },

    setCompaniesCount: (state, action) => {
      state.companiesCount = action.payload
    },

    setCompaniesCountName: (state, action) => {
      state.companiesCount = action.payload
    }
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchSearchByCompanyName.pending, (state) => {
        state.searchByNameResult = []
        state.status = StatusType.LOADING
      })

      .addCase(fetchSearchByCompanyName.fulfilled, (state, action: any) => {
        state.searchByNameResult = action.payload
        state.status = StatusType.SUCCESS
      })

      .addCase(fetchSearchByCompanyName.rejected, (state) => {
        state.searchByNameResult = []
        state.status = StatusType.ERROR
      })

      .addCase(fetchSearchOccupation.pending, (state) => {
        state.searchByNameResult = []
        state.status = StatusType.LOADING
      })

      .addCase(fetchSearchOccupation.fulfilled, (state, action: any) => {
        state.searchByOccupationResult = action.payload.data
        state.status = StatusType.SUCCESS
      })

      .addCase(fetchSearchOccupation.rejected, (state) => {
        state.searchByNameResult = []
        state.status = StatusType.ERROR
      })

      .addCase(loadImageUrl.pending, (state) => {
        state.status = StatusType.LOADING
      })
      .addCase(loadImageUrl.fulfilled, (state, action) => {
        state.status = StatusType.SUCCESS
        state.iconUrl = action.payload
      })
      .addCase(loadImageUrl.rejected, (state) => {
        state.status = StatusType.ERROR
      })
      .addCase(fetchCompaniesLength.fulfilled, (state, action: any) => {
        state.companiesCount = action.payload
        state.status = StatusType.SUCCESS
        
      })
      .addCase(fetchCompaniesLength.pending, (state) => {
        state.companiesCount = 0
        state.status = StatusType.LOADING
      })
      .addCase(fetchCompaniesLength.rejected, (state) => {
        state.companiesCount = 0
        state.status = StatusType.ERROR
      })

      .addCase(fetchCompaniesLengthName.fulfilled, (state, action: any) => {
        state.companiesCountName = action.payload
        state.status = StatusType.SUCCESS
        
      })
      .addCase(fetchCompaniesLengthName.pending, (state) => {
        state.companiesCountName = 0
        state.status = StatusType.LOADING
      })
      .addCase(fetchCompaniesLengthName.rejected, (state) => {
        state.companiesCountName = 0
        state.status = StatusType.ERROR
      })
  }
})

export const { searchByCompanyName, searchOccupation, setCurrentPage, setIconUrl, setCompaniesCount, setCompaniesCountName } = searchSlice.actions

export default searchSlice.reducer
