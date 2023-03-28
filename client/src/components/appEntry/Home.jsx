import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, Route, Routes, useLocation } from 'react-router-dom'
import { fetchPosts, getCompanyData, setInn } from '../../redux/questionary/slice'
import 'bootstrap/dist/css/bootstrap.min.css'
import CompanyDetails from '../companyDetails/CompanyDetails'
import CompaniesList from '../CompaniesList/searchByName/CompaniesList'
import { fetchSearchByCompanyName, searchByCompanyName, fetchSearchOccupation, searchOccupation } from '../../redux/searchResult/slice'
import s from './style/Home.module.css'
import Filter from '../../assets/filterComponent/Filter'
import EquipmentUnderPressure from '../filterForms/EquipmentUnderPressure'

export default function Home() {
  const dispatch = useDispatch()

  const loc = useLocation()

  const companyName = useSelector((state) => state.questionary.companyName)
  const inn = useSelector((state) => state.questionary.inn)

  const searchByNameData = useSelector((state) => state.search.searchByNameData)
  const searchByOccupationData = useSelector((state) => state.search.searchByOccupationData)

  const link = window.location.href
  const url = new URL(link)
  const urlDataCompany = '/data-company/'
  const urlSearchByName = '/search-name/'
  const urlSearchByOccupation = '/occupation/'
  const urlFilter = 'filter/'
  const currentPage = useSelector((state) => state.search.currentPage)

  const [firstEnterPath, setFirstEnterPath] = useState(false)

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
        const response = await dispatch(fetchSearchOccupation({ searchParamOccupation: searchParamOccupation, page: currentPage }))
        if (response.length) {
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

  const setHeader = () => {
    if (searchedName) {
      return <span><b><Link to={-1} className={s.grey_color}>"{searchedName}"</Link></b> / {companyName}</span>
    } 
    if(searchParamOccupation){
      return <span><b><Link to={-1} className={s.grey_color}>{searchParamOccupation}</Link></b> / {companyName}</span>
    }
  }

  const {namesCompanies, lengthArr: lengthArrName} = searchByNameData
  const {companyOccupation, lengthArr: lengthArrOcc } = searchByOccupationData
  const filterOccupationPath = `/filter/filter=${searchParamOccupation}`

  console.log(filterOccupationPath);


  return (
    <div className={s.wrapper}>
      <Routes>
        
        <Route exact path={urlDataCompany} element={<CompanyDetails firstEnterPath={firstEnterPath} setHeader={setHeader}/>} />

        <Route exact path={urlSearchByName} element={<CompaniesList companies={namesCompanies?.length ? namesCompanies : ''} searchedParam={searchedName} companiesCount={lengthArrName} />} />

        <Route exact path={urlSearchByOccupation} element={<CompaniesList searchedParam={searchParamOccupation} companies={companyOccupation?.length ? companyOccupation : ''} companiesCount={lengthArrOcc} filterPath={filterOccupationPath}/>} />

        <Route exact path={filterOccupationPath} element={<Filter filterContent={<EquipmentUnderPressure/>}/>}/>

      </Routes>
    </div>
  )
}
