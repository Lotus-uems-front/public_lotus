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

//Поиск по виду деятельности
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
    let urlIcon;
    const user = 'Leonid';
    if (URL === 'http://localhost:5000') {
        urlIcon = await companiesDataApi.getIcon(`C:/Users/semen/OneDrive/Рабочий стол/server/uems-uploads/icons/${login}_${fileName}.jpg`)
    } else {
        urlIcon = await companiesDataApi.getIcon(`/home/${user}/uems-uploads/icons/${login}_${fileName}.jpg`)
    }
    // console.log(`${urlIcon}`); // test
    return urlIcon
} catch (err) {
    console.log(`Ошибка::: `, err);
    return null
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
      state.searchByOccupationResult = action.payload
      state.status = StatusType.SUCCESS
    })

    .addCase(fetchSearchOccupation.rejected, (state) => {
      state.searchByNameResult = []
      state.status = StatusType.ERROR
    })

    .addCase(loadImageUrl.pending, (state) => {
      state.status = StatusType.LOADING;
    })
    .addCase(loadImageUrl.fulfilled, (state, action) => {
      state.status = StatusType.SUCCESS;
      state.iconUrl = action.payload;
    })
    .addCase(loadImageUrl.rejected, (state, action) => {
      state.status = StatusType.ERROR;
    });
  }
})

export const { searchByCompanyName, searchOccupation, setCurrentPage, setIconUrl } = searchSlice.actions

export default searchSlice.reducer
