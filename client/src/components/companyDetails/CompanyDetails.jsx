import React, { useEffect, useState } from 'react'
import { Accordion, Container } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { chemicalEquipmentManufacturing, fullInfo, individualForms } from '../../assets/lists/occupationTypesLists'
import s from './styles/Questionary.module.css'
import { QuestionaryItem } from './CompanyDetailItem/QuestionaryItem'

export default function CompanyDetails() {

  const companyData = useSelector((state) => state.questionary.companyData)

  const [allFormsData, setAllFormsData] = useState([])
  const [infoData, setInfoData] = useState([]) //данные только по контактам и экономике
  const [formsData, setFormsData] = useState([]) //данные по остальным формам
  const [underPressureEquip, setUnderPressureEquip] = useState([]) //данные форм по оборуд-ю под давл


  // console.log(companyData);
  //делаем единый объект в котором есть название форм по русски
  useEffect(() => {
    const result = []
    if (companyData.length > 0) {
      companyData.forEach((el) => {
        fullInfo.forEach((item) => {
          if (el._id === item.name) {
            result.push({
              ...el,
              title: item.title
            })
          }
        })
      })
    }
    setAllFormsData(result)
  }, [companyData, setAllFormsData])

  //делаем отбор по инфо-данным, данным по оборуд-ю под давл, остальным данным
  useEffect(() => {
    const underPressure = []
    const info = []
    const restForms = []

    if (allFormsData.length > 0) {
      allFormsData.forEach((el) => {
        chemicalEquipmentManufacturing.forEach((item) => {
          if (el._id === item) {
            underPressure.push(el)
          }
        })
        individualForms.forEach((form) => {
          if (el._id === form) {
            restForms.push(el)
          }
        })
        if (el._id === 'Main' || el._id === 'EconomicData' || el._id === 'Fifteen') {
          info.push(el)
        }
      })
    }

    setInfoData(info)
    setFormsData(restForms)
    setUnderPressureEquip(underPressure)
  }, [allFormsData])
  return (
    <Container className={`${s.container}`}>
      <Accordion defaultActiveKey='0' flush className={s.accordion}>
        {infoData.map((el, idx) => (
          <QuestionaryItem questionaryItem={el} idx={`${idx}_${idx}`} id='info' />
        ))}
        <Accordion.Item>
          <Accordion.Header className={`${s.accordion_header}`} id={'rest'}>
            Оборудование под давлением
          </Accordion.Header>
          <Accordion.Body>
            <Accordion defaultActiveKey='0' flush className={s.accordion} id='test'>
              {underPressureEquip.map((el, idx) => (
                <QuestionaryItem questionaryItem={el} idx={idx} id={'pressure'} />
              ))}
            </Accordion>
          </Accordion.Body>
        </Accordion.Item>
        {formsData.map((el, idx) => (
          <QuestionaryItem questionaryItem={el} idx={idx} id='rest' />
        ))}
      </Accordion>
    </Container>
  )
}
