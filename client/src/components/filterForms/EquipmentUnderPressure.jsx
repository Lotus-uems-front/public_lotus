import React, { useState } from 'react'
import { Col, Form } from 'react-bootstrap'
import { equipmentUnderPressure } from '../../assets/lists/equipmentUnderPressureList'
import s from '../../css/EquipmentUnderPressure.module.css'

export default function EquipmentUnderPressure() {
  const [showSubContainer, setShowSubContainer] = useState(new Array(equipmentUnderPressure.length).fill(false))
  const [equipmentData, setEquipmentData] = useState([])

  const handleContainerClick = (index) => {
    const newArray = [...showSubContainer]
    newArray[index] = !newArray[index]
    setShowSubContainer(newArray)
  }

  const handleEquipmentChange = (e, mainIndex, subIndex, idx) => {
    handleContainerClick(idx)
    const { name, value, type, checked } = e.target
    const isCheckbox = type === 'checkbox'

    // Check if the clicked element is a main container
    const isMainContainer = equipmentUnderPressure.some((element) => element.container === value)

    setEquipmentData((prevData) => {
      const updatedData = [...prevData]
      const mainEquipment = updatedData.find((item) => item.equipment === name)

      if (isCheckbox && !isMainContainer) {
        if (checked) {
          if (!mainEquipment) {
            updatedData.push({
              equipment: name,
              information: [],
              subequipment: [value]
            })
          } else {
            mainEquipment.subequipment.push(value)
          }
        } else {
          if (mainEquipment) {
            mainEquipment.subequipment = mainEquipment.subequipment.filter((sub) => sub !== value)
          }
        }
      } else if (!isCheckbox) {
        if (!mainEquipment) {
          updatedData.push({
            equipment: name,
            information: [{ information: equipmentUnderPressure[mainIndex].dimentions[subIndex], value }],
            subequipment: []
          })
        } else {
          const infoIndex = mainEquipment.information.findIndex((info) => info.information === equipmentUnderPressure[mainIndex].dimentions[subIndex])
          if (infoIndex === -1) {
            mainEquipment.information.push({
              information: equipmentUnderPressure[mainIndex].dimentions[subIndex],
              value
            })
          } else {
            mainEquipment.information[infoIndex].value = value
          }
        }
      }

      return updatedData
    })
  }

  console.log(equipmentData)

  return (
    <Form>
      {equipmentUnderPressure.map((element, index) => (
        <Form.Group key={element.container}>
          <Form.Check name={element.container} value={element.container} label={element.container} className={s.mainVessel} id={element.container} onClick={(e) => handleEquipmentChange(e, index, index, index)} />
          {showSubContainer[index] && (
            <div className={s.mainFormGroup}>
              <div className={s.dimentions}>
                {element.dimentions.map((d, dIndex) => (
                  <Col sm={2} key={d}>
                    <Form.Control placeholder={d} name={element.container} onChange={(e) => handleEquipmentChange(e, index, dIndex)} />
                  </Col>
                ))}
              </div>

              {element.subContainers.map((sub) => (
                <React.Fragment key={sub}>
                  <Form.Check name={element.container} value={sub} label={sub} id={sub} className={s.subVessel} onClick={(e) => handleEquipmentChange(e, element.container)} />
                </React.Fragment>
              ))}
            </div>
          )}
        </Form.Group>
      ))}
    </Form>
  )
}
