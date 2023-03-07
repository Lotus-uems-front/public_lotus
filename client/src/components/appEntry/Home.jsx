import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts, getCompanyData, setInn, fetchSearchByCompanyName, searchByCompanyName, searchOccupation, fetchSearchOccupation } from '../../redux/questionary/slice'
import 'bootstrap/dist/css/bootstrap.min.css'
import CompanyDetails from '../companyDetails/CompanyDetails'
import CompaniesList from '../CompaniesList/searchByName/CompaniesList'
// import CompanyDetails from './companyDetails/CompanyDetails'

// CiMoneyCheck1

export default function Home() {
  const dispatch = useDispatch()

  const inn = useSelector((state) => state.questionary.inn)
  const searchByName = useSelector((state) => state.questionary.searchByName) // массив Main найденных компаний по названию
  const companyOccupation = useSelector((state) => state.questionary.companyOccupation) // массив Main найденных компаний по виду деятльености

  const urlDataCompany = '/data-company/';
  const urlSearchByName = '/search-name/';
  const urlOccupation = '/occupation/';

  // отслеживаем URL
  useEffect(() => {
    const link = window.location.href
    const url = new URL(link)
    const innLink = url.searchParams.get('inn')
    const searchByName = url.searchParams.get('name')
    const searchParamOccupation = url.searchParams.get('occupation')

    console.log(`URL pathname::: `, url.pathname); // test

    //* При наличии поиска по вдиу деятельности
    if (searchParamOccupation && urlOccupation === url.pathname) {
      const searchCompanyOccupationArray = async () => {
        console.log(`search occupation::: `, searchParamOccupation); // test
        const response = await dispatch(fetchSearchOccupation(searchParamOccupation))

        if (response.length) {
          dispatch(searchOccupation(response))
        }
      }
      searchCompanyOccupationArray();
    }

    //* при наличии поиска по названию компании
    if (searchByName && urlSearchByName === url.pathname) {
      const searchByCompanyNameArray = async () => {
        const response = await dispatch(fetchSearchByCompanyName(searchByName))

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
  }, [])

  //сетаем в сейт ВСЕ данные с сервера по компании
  useEffect(() => {
    const fetchData = async () => {
      const response = await dispatch(fetchPosts(inn))

      if (response.length) {
        dispatch(getCompanyData(response))
      }
    }
    fetchData()
  }, [inn, fetchPosts])

  return (
    <>
      <CompanyDetails />
      <CompaniesList companies={searchByName?.length ? searchByName : companyOccupation?.length ? companyOccupation : ''} />
    </>
  )
}
