import React from 'react'
import { Col, Form } from 'react-bootstrap'
import { pipeRolling } from '../../assets/lists/pipeRollongList'
import s from '../../css/PipeRolling.module.css'

export default function PipeRolling() {
  const { dimentions, standarts } = pipeRolling
  return (
    <Form>
      <div className={s.dimentions}>
        {dimentions.map((dimention) => (
          <Col sm={2}>
            <Form.Control placeholder={dimention} />
          </Col>
        ))}
      </div>
      <div className={s.gosts}>
        {standarts.map((standart) => (
          <Form.Check label={standart} />
        ))}
      </div>
    </Form>
  )
}
