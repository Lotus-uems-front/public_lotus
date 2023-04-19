import React, { useState, useEffect } from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import EquipmentUnderPressure from '../../components/filterForms/EquipmentUnderPressure'
import PipeRolling from '../../components/filterForms/PipeRolling'
import s from '../../css/Filter.module.css'
import Header from '../header/Header'
import { companiesDataApi } from '../../api/api'
import { useSelector } from 'react-redux'

export default function Filter({ content, searchedParam, companiesCount, isBackBtnNeeded }) {

  const [equipData, setEquipData] = useState({})
  const [filteredInns, setFilteredInns] = useState([])
  const [clicked, setClicked] = useState(false)


  const setHeader = () => {
    return (
      <Header
        searchedParam={searchedParam}
        companiesCount={companiesCount}
        isBackBtnNeeded={isBackBtnNeeded}
        isSearched={true}
      />
    )
  }

  const sendEquipmentData = (e) => {
    setEquipData(e)
    // console.log(`DATA::: `, e);
  }

  const handleClickSearch = () => {
    (async () => {
      try {
        const result = await companiesDataApi.getFilterData(equipData)
        setFilteredInns(result)
        // console.log(result);
        setClicked(true)
      } catch (err) {
        console.log(`Ошибка поиска по фильтру: `, err);
      }
    })()

  }

  return (
    <Container className={s.wrapper}>
      {setHeader()}

      {content === 'Сосуды и аппараты работающие под давлением' && <EquipmentUnderPressure sendEquipmentData={sendEquipmentData} clicked={clicked} searchedParam={content} filteredInns={filteredInns}/>}

      {content === 'Трубный прокат' && <PipeRolling />}

      <Row> &nbsp;</Row>
      {!clicked ? <Button
        onClick={handleClickSearch}
      >
        Поиск
      </Button> : ''}
    </Container>
  )
}
