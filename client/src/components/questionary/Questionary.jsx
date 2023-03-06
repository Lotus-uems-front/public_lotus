import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { fetchPosts, getCompanyData, setInn, fetchSearchByCompanyName, searchByCompanyName } from '../../redux/questionary/slice'

import Accordion from 'react-bootstrap/Accordion'
import Container from 'react-bootstrap/Container'
import 'bootstrap/dist/css/bootstrap.min.css'
import s from './styles/Questionary.module.css'
import { chemicalEquipmentManufacturing, fullInfo, individualForms } from '../lists/occupationTypesLists'
import { QuestionaryItem } from './questionaryItem/QuestionaryItem'

// CiMoneyCheck1

export default function Questionary() {
  const dispatch = useDispatch()

  const companyData = useSelector((state) => state.questionary.companyData)
  const inn = useSelector((state) => state.questionary.inn)
  const searchByName = useSelector((state) => state.questionary.searchByName) // массив Main найденных компаний по названию
  const [occupationCompany, setOccupationCompany] = useState('') // todo: вид деятельности для поиска компании

  const [allFormsData, setAllFormsData] = useState([])
  const [infoData, setInfoData] = useState([]) //данные только по контактам и экономике
  const [formsData, setFormsData] = useState([]) //данные по остальным формам
  const [underPressureEquip, setUnderPressureEquip] = useState([]) //данные форм по оборуд-ю под давл

  // отслеживаем URL
  useEffect(() => {
    const link = window.location.href
    const url = new URL(link)
    const innLink = url.searchParams.get('inn')
    const searchByName = url.searchParams.get('name')
    const searchOccupation = url.searchParams.get('occupation')

    if (searchOccupation) {
      setOccupationCompany(searchOccupation)
      //todo: запустить POST запрос для поиска компании по виду деятельности
      //todo: получить ответ, обработать
    }

    if (searchByName) {
      //* при наличии поиска по названию компании
      const searchByCompanyNameArray = async () => {
        const response = await dispatch(fetchSearchByCompanyName(searchByName))

        if (response.length) {
          dispatch(searchByCompanyName(response))
        }
      }
      searchByCompanyNameArray()
    }

    if (innLink) {
      dispatch(setInn(innLink))
    }
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
