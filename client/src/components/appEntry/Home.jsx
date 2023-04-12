import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Routes, useLocation } from 'react-router-dom'
import { fetchPosts, getCompanyData, setInn } from '../../redux/questionary/slice'
import 'bootstrap/dist/css/bootstrap.min.css'
import CompanyDetails from '../companyDetails/CompanyDetails'
import CompaniesList from '../CompaniesList/CompaniesList'
import {
  fetchSearchByCompanyName,
  searchByCompanyName,
  fetchSearchOccupation,
  searchOccupation
} from '../../redux/searchResult/slice'
import s from '../../css/Home.module.css'
import Filter from '../../assets/filterComponent/Filter'
import Header from '../../assets/header/Header'

export default function Home() {
  const dispatch = useDispatch()

  const loc = useLocation()

  // const companyName = useSelector((state) => state.questionary.companyName)
  const inn = useSelector((state) => state.questionary.inn)

  const searchByNameData = useSelector((state) => state.search.searchByNameData)
  const searchByOccupationData = useSelector((state) => state.search.searchByOccupationData)

  const link = window.location.href
  const url = new URL(link)
  const urlDataCompany = '/data-company/'
  const urlSearchByName = '/search-name/'
  const urlSearchByOccupation = '/occupation/'
  const currentPage = useSelector((state) => state.search.currentPage)

  const [firstEnterPath, setFirstEnterPath] = useState(false)

  const { namesCompanies, lengthArr: lengthArrName } = searchByNameData
  const { companyOccupation, lengthArr: lengthArrOcc } = searchByOccupationData

  useEffect(() => {
    if (url.pathname === urlDataCompany) {
      setFirstEnterPath(true)
    }
  }, [])

  const innLink = url.searchParams.get('inn')
  const [searchedName] = useState(url.searchParams.get('name'))
  const [searchParamOccupation] = useState(url.searchParams.get('occupation'))

  // отслеживаем URL
  useEffect(() => {

    //* При наличии поиска по вдиу деятельности
    if (searchParamOccupation && urlSearchByOccupation === url.pathname) {
      const searchCompanyOccupationArray = async () => {
        const response = await dispatch(
          fetchSearchOccupation({ searchParamOccupation: searchParamOccupation, page: currentPage })
        )
        if (response.length) {
          dispatch(searchOccupation(response))
        }
      }
      searchCompanyOccupationArray()
    }

    //* при наличии поиска по названию компании
    if (searchedName && urlSearchByName === url.pathname) {
      const searchByCompanyNameArray = async () => {
        const response = await dispatch(
          fetchSearchByCompanyName({ searchString: searchedName, page: currentPage })
        )
        if (response.length) {
          dispatch(searchByCompanyName(response))
        }
      }
      searchByCompanyNameArray()
    }

    //* при наличии ИНН
    if (innLink && urlDataCompany === url.pathname) {
      dispatch(setInn(innLink))
    }
  }, [link, loc.pathname, currentPage, url.pathname])

  //сетаем в сейт ВСЕ данные с сервера по компании
  useEffect(() => {
    const fetchData = async () => {
      const response = await dispatch(fetchPosts(inn))
      if (response.length) {
        dispatch(getCompanyData(response))
      }
    }
    fetchData()
  }, [inn])

  const filterOccupationPath = `/filter/filter=${searchParamOccupation}`

  const setHeader = () => {
    if (searchedName) {
      return (
        <Header
          searchedParam={searchedName}
          companiesCount={lengthArrName}
          isBackBtnNeeded={true}
        />
      )
    }
    if (searchParamOccupation) {
      return (
        <Header
          searchedParam={searchParamOccupation}
          companiesCount={lengthArrOcc}
          isBackBtnNeeded={true}
        />
      )
    }
  }

  return (
    <div className={s.wrapper}>
      <Routes>
        <Route
          exact
          path={urlDataCompany}
          element={<CompanyDetails firstEnterPath={firstEnterPath} setHeader={setHeader} />}
        />

        <Route
          exact
          path={urlSearchByName}
          element={
            <CompaniesList
              companies={namesCompanies?.length ? namesCompanies : ''}
              searchedParam={searchedName}
              companiesCount={lengthArrName}
              isFilterNeeded={false}
            />
          }
        />

        <Route
          exact
          path={urlSearchByOccupation}
          element={
            <CompaniesList
              searchedParam={searchParamOccupation}
              companies={companyOccupation?.length ? companyOccupation : ''}
              companiesCount={lengthArrOcc}
              filterPath={filterOccupationPath}
              isFilterNeeded={true}
            />
          }
        />

        <Route
          exact
          path={filterOccupationPath}
          element={<Filter content={searchParamOccupation} searchedParam={searchParamOccupation} companiesCount={lengthArrOcc} isBackBtnNeeded={true} />}
        />
      </Routes>
    </div>
  )
}
