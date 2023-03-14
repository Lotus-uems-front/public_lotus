import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {  Route, Routes, useLocation  } from 'react-router-dom'
import { fetchPosts, getCompanyData, setInn } from '../../redux/questionary/slice'
import 'bootstrap/dist/css/bootstrap.min.css'
import CompanyDetails from '../companyDetails/CompanyDetails'
import CompaniesList from '../CompaniesList/searchByName/CompaniesList'
import { fetchSearchByCompanyName, searchByCompanyName, fetchSearchOccupation, searchOccupation } from '../../redux/searchResult/slice'



export default function Home() {
  const dispatch = useDispatch()

  const loc = useLocation()

  const inn = useSelector((state) => state.questionary.inn)
  const searchByNameResult = useSelector((state) => state.search.searchByNameResult) // массив Main найденных компаний по названию
  const searchByOccupationResult = useSelector((state) => state.search.searchByOccupationResult) // массив Main найденных компаний по виду деятльености

  const link = window.location.href
  const url = new URL(link)
  const urlDataCompany = '/data-company/'
  const urlSearchByName = '/search-name/'
  const urlSearchByOccupation = '/occupation/'


  const [firstEnterPath, setFirstEnterPath] = useState('')

  useEffect(()=> {
    setFirstEnterPath(url.pathname)
  }, [])

  // отслеживаем URL
  useEffect(() => {
    const innLink = url.searchParams.get('inn')
    const searchedName = url.searchParams.get('name')
    const searchParamOccupation = url.searchParams.get('occupation')

    //* При наличии поиска по вдиу деятельности
    if (searchParamOccupation && urlSearchByOccupation === url.pathname) {
      const searchCompanyOccupationArray = async () => {
        // console.log(`search occupation::: `, searchParamOccupation); // test
        const response = await dispatch(fetchSearchOccupation(searchParamOccupation))
        if (response.length) {
          dispatch(searchOccupation(response))
        }
      }
      searchCompanyOccupationArray()
    }

    //* при наличии поиска по названию компании
    if (searchedName && urlSearchByName === url.pathname) {
      const searchByCompanyNameArray = async () => {
        const response = await dispatch(fetchSearchByCompanyName(searchedName))

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
  }, [link, loc.pathname])

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

  return (
    <Routes>
      <Route exact path={urlDataCompany} element={<CompanyDetails firstEnterPath={firstEnterPath} urlDataCompany={urlDataCompany}/>} />
      <Route exact path={urlSearchByName} element={<CompaniesList companies={searchByNameResult?.length ? searchByNameResult : ''} />} />
      <Route exact path={urlSearchByOccupation} element={<CompaniesList companies={searchByOccupationResult?.length ? searchByOccupationResult : ''} />} />
    </Routes>
  )
}
