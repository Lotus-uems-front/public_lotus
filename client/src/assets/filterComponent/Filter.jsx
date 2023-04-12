import React from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import EquipmentUnderPressure from '../../components/filterForms/EquipmentUnderPressure'
import PipeRolling from '../../components/filterForms/PipeRolling'
import s from '../../css/Filter.module.css'
import Header from '../header/Header'

export default function Filter({ content, searchedParam, companiesCount, isBackBtnNeeded }) {
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

  return (
    <Container className={s.wrapper}>
      {setHeader()}

      {content === 'Сосуды и аппараты работающие под давлением' && <EquipmentUnderPressure />}

      {content === 'Трубный прокат' && <PipeRolling />}

      <Row> &nbsp;</Row>
      <Button>Поиск</Button>
    </Container>
  )
}
