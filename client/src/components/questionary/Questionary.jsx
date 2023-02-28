import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts, getCompanyData, getFilteredOccupationNames, getFilteredCompanyData, setInn } from '../../redux/questionary/slice'
import Accordion from 'react-bootstrap/Accordion'
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.min.css'
import s from './styles/Questionary.module.css'
import { chemicalEquipmentManufacturing, fullInfo, individualForms } from '../lists/occupationTypesLists'

// CiMoneyCheck1

export default function Questionary() {
  const dispatch = useDispatch()
  const companyData = useSelector((state) => state.questionary.companyData) //все данные с сервера
  const inn = useSelector((state) => state.questionary.inn)

  const [allFormsData, setAllFormsData] = useState([])
  const [infoData, setInfoData] = useState([]) //данные только по контактам и экономике
  const [formsData, setFormsData] = useState([]) //данные по остальным формам
  const [underPressureEquip, setUnderPressureEquip] = useState([]) //данные по фомам относ-ся к оборуд-ю под давл

  // отслеживаем URL
  useEffect(() => {
    const link = window.location.href
    const url = new URL(link)
    const innLink = url.searchParams.get('inn')
    dispatch(setInn(innLink))
  }, [])

  //сетаем в сейт ВСЕ данные с сервера по компании
  useEffect(() => {
    const fetchData = async () => {
      const response = await dispatch(fetchPosts(inn))
      if (response.length) {
        dispatch(getCompanyData(response))
      }
    }
    fetchData()
  }, [inn, fetchPosts])

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
        if (el._id === 'Main' || el._id === 'EconomicData') {
          info.push(el)
        }
      })
    }

    setInfoData(info)
    setFormsData(restForms)
    setUnderPressureEquip(underPressure)
  }, [allFormsData])

  console.log(allFormsData)

  console.log(infoData)
  console.log(formsData)
  console.log(underPressureEquip)

  return (
    <Container className={`${s.container}`}>
      <Accordion defaultActiveKey='0' flush className={s.accordion}>
        {infoData.map((el, idx) => (
          <Accordion.Item eventKey={`${el._id}_${idx}`} className={`${s.accordion_item}`} key={el._id}>
            <Accordion.Header className={`${s.accordion_header}`} id={'info'}>{el.title}</Accordion.Header>
            <Accordion.Body>
              {el.data.map((item, index) => (
                <div key={index}>{item.value && item.information + ' ' + item.value}</div>
              ))}
            </Accordion.Body>
          </Accordion.Item>
        ))}
        <Accordion.Item>
          <Accordion.Header className={`${s.accordion_header}`} id={'rest'}>Оборудование под давлением</Accordion.Header>
          <Accordion.Body>
            {underPressureEquip.map((el, idx) => (
              <Accordion defaultActiveKey='0' flush className={s.accordion}>
                <Accordion.Item eventKey={idx} className={`${s.accordion_item}`} key={el._id}>
                  <Accordion.Header className={`${s.accordion_header}`} id={'pressure'}>{el.title}</Accordion.Header>
                  <Accordion.Body>
                    {el.data.map((item, index) => (
                      <div key={index}>{item.value && item.information + ' ' + item.value}</div>
                    ))}
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            ))}
          </Accordion.Body>
        </Accordion.Item>
        {formsData.map((el, idx) => (
          <Accordion.Item eventKey={idx} className={`${s.accordion_item}`} key={el._id}>
            <Accordion.Header className={`${s.accordion_header}`} id={'rest'}>{el.title}</Accordion.Header>
            <Accordion.Body>
              {el.data.map((item, index) => (
                <div key={index}>{item.value && item.information + ' ' + item.value}</div>
              ))}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  )
}
