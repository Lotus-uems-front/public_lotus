import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { companiesDataApi, URL } from '../../api/api'
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

export const fetchSearchOccupation = createAsyncThunk('search/fetchSearchOccupation', async (occupation: Object) => {

  try {
    const data = await companiesDataApi.searchOccupation(occupation)
    return data
  } catch (err) {
    console.log(`Ошибка в slise.tsx::: `, err)
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
  currentPage: 1,
  iconUrl: '',
  companiesCount: 0,
  companiesCountName: 0,

  searchByNameData: {
    namesCompanies: [],
    lengthArr: 0
  },

  searchByOccupationData: {
    companyOccupation: [],
    lengthArr: 0
  }
}

export const searchSlice = createSlice({
  name: 'search',
  initialState,
  reducers: {
    searchByCompanyName: (state, action) => {
      state.searchByNameData = action.payload
    },

    searchOccupation: (state, action) => {
      state.searchByOccupationData = action.payload
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
    //by name handlers
    builder
      .addCase(fetchSearchByCompanyName.pending, (state) => {
        state.searchByNameData = {
          namesCompanies: [],
          lengthArr: 0
        }
        state.status = StatusType.LOADING
      })

      .addCase(fetchSearchByCompanyName.fulfilled, (state, action: any) => {
        state.searchByNameData = action.payload
        state.status = StatusType.SUCCESS
      })

      .addCase(fetchSearchByCompanyName.rejected, (state) => {
        state.searchByNameData = {
          namesCompanies: [],
          lengthArr: 0
        }
        state.status = StatusType.ERROR
      })

   //by occupation handlers
      .addCase(fetchSearchOccupation.pending, (state) => {
        state.searchByOccupationData = {
          companyOccupation: [],
          lengthArr: 0
        }
        state.status = StatusType.LOADING
      })

      .addCase(fetchSearchOccupation.fulfilled, (state, action: any) => {
        state.searchByOccupationData = action.payload
        state.status = StatusType.SUCCESS
      })

      .addCase(fetchSearchOccupation.rejected, (state) => {
        state.searchByOccupationData = {
          companyOccupation: [],
          lengthArr: 0
        }
        state.status = StatusType.ERROR
      })

      .addCase(loadImageUrl.pending, (state) => {
        state.status = StatusType.LOADING
        state.iconUrl = ''
      })
      .addCase(loadImageUrl.fulfilled, (state, action) => {
        state.status = StatusType.SUCCESS
        state.iconUrl = action.payload
      })
      .addCase(loadImageUrl.rejected, (state) => {
        state.status = StatusType.ERROR
        state.iconUrl = ''
      })
  }
})

export const { searchByCompanyName, searchOccupation, setCurrentPage, setIconUrl, setCompaniesCount, setCompaniesCountName } = searchSlice.actions

export default searchSlice.reducer
