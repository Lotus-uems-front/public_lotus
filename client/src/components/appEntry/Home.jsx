import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts, getCompanyData, setInn, fetchSearchByCompanyName, searchByCompanyName } from '../../redux/questionary/slice'
import 'bootstrap/dist/css/bootstrap.min.css'
import CompanyDetails from '../companyDetails/CompanyDetails'
import CompaniesList from '../CompaniesList/searchByName/CompaniesList'
// import CompanyDetails from './companyDetails/CompanyDetails'

// CiMoneyCheck1

export default function Home() {
  const dispatch = useDispatch()

  const inn = useSelector((state) => state.questionary.inn)
  const searchByName = useSelector((state) => state.questionary.searchByName) // массив Main найденных компаний по названию
  const [occupationCompany, setOccupationCompany] = useState('') // todo: вид деятельности для поиска компании

  // отслеживаем URL
  useEffect(() => {
    const link = window.location.href
    const url = new URL(link)
    const innLink = url.searchParams.get('inn')
    const searchByName = url.searchParams.get('name')
    const searchOccupation = url.searchParams.get('occupation')

    if (searchOccupation) {
      setOccupationCompany(searchOccupation)
      //todo: запустить POST запрос для поиска компании по виду деятельности
      //todo: получить ответ, обработать
    }

    if (searchByName) {
      //* при наличии поиска по названию компании
      const searchByCompanyNameArray = async () => {
        const response = await dispatch(fetchSearchByCompanyName(searchByName))

        if (response.length) {
          dispatch(searchByCompanyName(response))
        }
      }
      searchByCompanyNameArray()
    }

    if (innLink) {
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
      <CompaniesList companies={searchByName}/>
    </>
  )
}
