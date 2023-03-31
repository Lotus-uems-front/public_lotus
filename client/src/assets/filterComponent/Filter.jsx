import React from 'react'
import { Button, Card, Container, Row } from 'react-bootstrap'
import EquipmentUnderPressure from '../../components/filterForms/EquipmentUnderPressure'
import PipeRolling from '../../components/filterForms/PipeRolling'
import BackButton from '../BackButton/BackButton'
import s from '../../css/Filter.module.css'

export default function Filter({ content }) {


  const setHeader = () => {
      return (
        <span>
          Фильтр по запросу: <b>"{content}"</b>
        </span>
      )
    
  }

  return (
    <Container className={s.wrapper}>
      <Card className={s.card}>
        <Card.Header>
          <BackButton style={s.back_icon} />
          {setHeader()}
        </Card.Header>
      </Card>

      {content === 'Сосуды и аппараты работающие под давлением' && <EquipmentUnderPressure  />}

      {content === 'Трубный прокат' && <PipeRolling />}

      <Row> &nbsp;</Row>
      <Button>Поиск</Button>
    </Container>
  )
}
