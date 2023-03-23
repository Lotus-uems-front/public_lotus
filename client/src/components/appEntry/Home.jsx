import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import { fetchPosts, getCompanyData, setInn } from '../../redux/questionary/slice'
import 'bootstrap/dist/css/bootstrap.min.css'
import CompanyDetails from '../companyDetails/CompanyDetails'
import CompaniesList from '../CompaniesList/searchByName/CompaniesList'
import { fetchSearchByCompanyName, searchByCompanyName, fetchSearchOccupation, searchOccupation } from '../../redux/searchResult/slice'
import s from './style/Home.module.css'

export default function Home() {
  const dispatch = useDispatch()

  const loc = useLocation()

  const companyName = useSelector((state) => state.questionary.companyName)
  const inn = useSelector((state) => state.questionary.inn)
  const searchByNameResult = useSelector((state) => state.search.searchByNameResult) // массив Main найденных компаний по названию
  const searchByOccupationResult = useSelector((state) => state.search.searchByOccupationResult) // массив Main найденных компаний по виду деятльености
  // const companiesCount = useSelector((state) => state.search.companiesCount)

  // console.log(searchByOccupationResult);

  const link = window.location.href
  const url = new URL(link)
  const urlDataCompany = '/data-company/'
  const urlSearchByName = '/search-name/'
  const urlSearchByOccupation = '/occupation/'
  const currentPage = useSelector((state) => state.search.currentPage)

  const [firstEnterPath, setFirstEnterPath] = useState(false)
  // const occupation = 'occupation'
  // const name = 'name'

  useEffect(() => {
    if (url.pathname === urlDataCompany) {
      setFirstEnterPath(true)
    }
  }, [])

  // const searchedName = url.searchParams.get('name')
  // const searchParamOccupation = url.searchParams.get('occupation')
  const innLink = url.searchParams.get('inn')

  const [searchedName] = useState(url.searchParams.get('name'))
  const [searchParamOccupation] = useState(url.searchParams.get('occupation'))

  // отслеживаем URL
  useEffect(() => {
    //* При наличии поиска по вдиу деятельности
    if (searchParamOccupation && urlSearchByOccupation === url.pathname) {
      const searchCompanyOccupationArray = async () => {
        const response = await dispatch(fetchSearchOccupation({ searchParamOccupation: searchParamOccupation, page: currentPage }))
        if (response) {
          dispatch(searchOccupation(response))
        }
      }
      searchCompanyOccupationArray()
    }

    //* при наличии поиска по названию компании
    if (searchedName && urlSearchByName === url.pathname) {
      const searchByCompanyNameArray = async () => {
        const response = await dispatch(fetchSearchByCompanyName({ searchString: searchedName, page: currentPage }))
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
  }, [link, loc.pathname, currentPage])

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
  // console.log('there', window.history);

  const setHeader = () => {
    if (searchedName) {
      return <span><b><Link to={-1} className={s.grey_color}>"{searchedName}"</Link></b> / {companyName}</span>
    } 
    if(searchParamOccupation){
      return <span><b><Link to={-1} className={s.grey_color}>{searchParamOccupation}</Link></b> / {companyName}</span>
    }

  }
  return (
    <div className={s.wrapper}>
      <Routes>
        <Route exact path={urlDataCompany} element={<CompanyDetails firstEnterPath={firstEnterPath} setHeader={setHeader}/>} />
        <Route exact path={urlSearchByName} element={<CompaniesList companies={searchByNameResult?.length ? searchByNameResult : ''} searchedName={searchedName} />} />
        <Route exact path={urlSearchByOccupation} element={<CompaniesList searchParamOccupation={searchParamOccupation} companies={searchByOccupationResult?.length ? searchByOccupationResult : ''} />} />
      </Routes>
    </div>
  )
}
