import React, { useState, useEffect } from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import EquipmentUnderPressure from '../../components/filterForms/EquipmentUnderPressure'
import PipeRolling from '../../components/filterForms/PipeRolling'
import s from '../../css/Filter.module.css'
import Header from '../header/Header'
import { companiesDataApi } from '../../api/api'

export default function Filter({ content, searchedParam, companiesCount, isBackBtnNeeded }) {

  const [equipData, setEquipData] = useState({})

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
    console.log(`DATA::: `, e);
  }

  const handleClickSearch = () => {
    (async () => {
      try {
        console.log(`CLICK`);
        const result = await companiesDataApi.getFilterData(equipData)
      } catch (err) {
        console.log(`Ошибка поиска по фильтру: `, err);
      }
    })()

  }

  return (
    <Container className={s.wrapper}>
      {setHeader()}

      {content === 'Сосуды и аппараты работающие под давлением' && <EquipmentUnderPressure sendEquipmentData={sendEquipmentData} />}

      {content === 'Трубный прокат' && <PipeRolling />}

      <Row> &nbsp;</Row>
      <Button
        onClick={handleClickSearch}
      >
        Поиск
      </Button>
    </Container>
  )
}
