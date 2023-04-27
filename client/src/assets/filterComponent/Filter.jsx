import React, { useState, useEffect } from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import EquipmentUnderPressure from '../../components/filterForms/EquipmentUnderPressure'
import PipeRolling from '../../components/filterForms/PipeRolling'
import s from '../../css/Filter.module.css'
import Header from '../header/Header'
import { useDispatch, useSelector } from 'react-redux'
import { fetchFilteredInns, setFilteredCompanies } from '../../redux/filter/slice'
import { useNavigate } from 'react-router-dom'

export default function Filter({ content, searchedParam, companiesCount, isBackBtnNeeded }) {
  const [buttonClicked, setButtonClicked] = useState(false)

  const filteredInns = useSelector((state) => state.filter.filteredInns)
  const companyOccupation = useSelector((state) => state.search.searchByOccupationData.companyOccupation)
  const equipmentData = useSelector((state) => state.filter.equipmentData)

  const navigate = useNavigate()
  const dispatch = useDispatch()

  const handleClickSearch = async () => {
    await dispatch(fetchFilteredInns(equipmentData))
    setButtonClicked(true)
    navigate('/filtered-companies')
  }


  const filteredCompanies = useSelector((state) => state.filter.filteredCompanies)


  useEffect(() => {
    const filterCompanies = async () => {
      if (filteredInns && filteredInns.length > 0) {
        const filteredCompaniesArr = companyOccupation.filter((el) => {
          return el.data.some((item) => {
            return item.information === 'ИНН' && filteredInns.includes(item.value)
          })
        })
  
        await dispatch(setFilteredCompanies(filteredCompaniesArr))
      } else {
        await dispatch(setFilteredCompanies([]))
      }
    };
  
    filterCompanies();
  }, [buttonClicked, filteredInns, companyOccupation, dispatch])


  // useEffect(() => {
  //   const filterCompanies = async () => {
  //     let filteredCompaniesArr = []
  //     if (filteredInns && filteredInns.length > 0) {
  //       companyOccupation.map((el) => {
  //         el.data.map((item) => {
  //           if (item.information === 'ИНН') {
  //             filteredInns.forEach((inn) => {
  //               if (item.value === inn) {
  //                 filteredCompaniesArr.push(el)
  //                 return el
  //               }
  //             })
  //           }
  //         })
  //       })
  //       await dispatch(setFilteredCompanies(filteredCompaniesArr))
  //     }
  //   }

  //   filterCompanies()
  // }, [buttonClicked, companyOccupation, filteredInns, dispatch])

  console.log('companies', filteredCompanies)
  console.log('inns', filteredInns);
  // console.log(companyOccupation);

  return (
    <Container className={s.wrapper}>
      <Header
        searchedParam={searchedParam}
        companiesCount={companiesCount}
        isBackBtnNeeded={isBackBtnNeeded}
        isSearched={true}
      />

      {content === 'Сосуды и аппараты работающие под давлением' && <EquipmentUnderPressure />}

      {content === 'Трубный прокат' && <PipeRolling />}

      <Row> &nbsp;</Row>
      <Button onClick={handleClickSearch}>Поиск</Button>
    </Container>
  )
}
