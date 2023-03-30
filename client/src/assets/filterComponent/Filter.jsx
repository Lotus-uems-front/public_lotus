import React from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import EquipmentUnderPressure from '../../components/filterForms/EquipmentUnderPressure'
import PipeRolling from '../../components/filterForms/PipeRolling'
import s from './style/Filter.module.css'

export default function Filter({ content }) {
  const doChangeValue = (e, index) => {
    // console.log(e, index);
  }

  console.log(content);

  return (
    <Container className={s.wrapper}>
      {content === 'Сосуды и аппараты работающие под давлением' && <EquipmentUnderPressure doChangeValue={doChangeValue} />}

      {content === 'Трубный прокат' && <PipeRolling doChangeValue={doChangeValue} />}

      <Row> &nbsp;</Row>
      <Button>Search</Button>
    </Container>
  )
}
