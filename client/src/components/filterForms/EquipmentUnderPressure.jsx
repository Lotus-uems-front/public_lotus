import React, { useState } from 'react'
import { Col, Form } from 'react-bootstrap'
import { equipmentUnderPressure } from '../../assets/lists/formsDimentions'
import s from './style/EquipmentUnderPressure.module.css'

export default function EquipmentUnderPressure() {
  const [showSubContainer, setShowSubContainer] = useState(new Array(equipmentUnderPressure.length).fill(false))

  const handleContainerClick = (index) => {
    const newArray = [...showSubContainer]
    newArray[index] = !newArray[index]
    setShowSubContainer(newArray)
  }

  const doChangeValue = (e, index) => {
    handleContainerClick(index)
  }

  return (
    <Form>
      {equipmentUnderPressure.map((element, index) => (
        <Form.Group key={element.container}>
          <Form.Check value={element.container} label={element.container} className={s.mainVessel} onClick={(e) => doChangeValue(e, index)} id={element.container} />
          {showSubContainer[index] && (
            <div className={s.mainFormGroup}>
              <div className={s.dimentions}>
                {element.dimentions.map((dim) => (
                  <Col sm={2}>
                    <Form.Control placeholder={dim} />
                  </Col>
                ))}
              </div>

              {element.subContainers.map((sub) => (
                <React.Fragment key={sub}>
                  <Form.Check value={sub} label={sub} id={sub} className={s.subVessel} onClick={(e) => doChangeValue(e)} />
                </React.Fragment>
              ))}
            </div>
          )}
        </Form.Group>
      ))}
    </Form>
  )
}
