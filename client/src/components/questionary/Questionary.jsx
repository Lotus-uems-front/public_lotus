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
<<<<<<< HEAD
  const companyData = useSelector((state) => state.questionary.companyData) //все данные с сервера
  const inn = useSelector((state) => state.questionary.inn)
=======
  const companyData = useSelector((state) => state.questionary.companyData)
  const filteredOccupationNames = useSelector((state) => state.questionary.filteredCompanyData)
  const [inn, setInn] = useState('') // ИНН из строки URL
  const [companyName, setCompanyName] = useState('') // значение для поиска компании по названию
  const [occupationCompany, setOccupationCompany] = useState('') // вид деятельности для поиска компании
>>>>>>> 5bb16c2152856385289af34b85ba23d695386c76

  const [allFormsData, setAllFormsData] = useState([])
  const [infoData, setInfoData] = useState([]) //данные только по контактам и экономике
  const [formsData, setFormsData] = useState([]) //данные по остальным формам
  const [underPressureEquip, setUnderPressureEquip] = useState([]) //данные по фомам относ-ся к оборуд-ю под давл

  // отслеживаем URL
  useEffect(() => {
<<<<<<< HEAD
    const link = window.location.href
    const url = new URL(link)
    const innLink = url.searchParams.get('inn')
    dispatch(setInn(innLink))
=======
    const link = window.location.href;
    const url = new URL(link);
    const innLink = url.searchParams.get('inn');
    const searchByName = url.searchParams.get('name');
    const searchOccupation = url.searchParams.get('occupation');

    if (searchOccupation) {
      setOccupationCompany(searchOccupation)
      //todo: запустить POST запрос для поиска компании по виду деятельности
      //todo: получить ответ, обработать
    }

    if (searchByName) {
      setCompanyName(searchByName)
      // todo: запустить POST запрос на поиск компании по названию
      //todo: получить ответ, обработать
    }

    if (innLink) {
      setInn(innLink)
    }
>>>>>>> 5bb16c2152856385289af34b85ba23d695386c76
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
<<<<<<< HEAD
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
=======
    if (companyData.length) {
      const intersection = []
      const filteredData = []
      companyData.forEach((el) => {
        fullInfo.forEach(item => {
          if (el._id === item.name) {
            intersection.push(item.title);
            filteredData.push(el)
          }
        })
      })
      //  setFilteredCompanyData(intersection)
      setFilteredCompanyData(filteredData)
      dispatch(getFilteredCompanyData(intersection))

>>>>>>> 5bb16c2152856385289af34b85ba23d695386c76

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

<<<<<<< HEAD
=======
  console.log(filteredCompanyData);

>>>>>>> 5bb16c2152856385289af34b85ba23d695386c76
  return (
    <Container className={`${s.container}`}>
      <Accordion defaultActiveKey='0' flush className={s.accordion}>
<<<<<<< HEAD
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
=======
        <div className={s.test}></div>
        {filteredOccupationNames.map((el, idx) => (
          <Accordion.Item eventKey={idx} key={el} >
            <Accordion.Header className={s.accordion_header}><span>{el}</span></Accordion.Header>
            <Accordion.Body className={s.accordion_body}>
              {filteredCompanyData && filteredCompanyData[idx] && filteredCompanyData[idx].data.map(el => (
                <div key={el._id}>{el.value && el.information + ' ' + el.value}</div>

>>>>>>> 5bb16c2152856385289af34b85ba23d695386c76
              ))}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>
  )
}
