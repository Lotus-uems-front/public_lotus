import React, { useEffect, useState } from 'react'
import { Accordion, Card, Container } from 'react-bootstrap'
import { IoIosArrowBack } from 'react-icons/io';
import { useSelector, useDispatch } from 'react-redux'
import { chemicalEquipmentManufacturing, fullInfo, individualForms } from '../../assets/lists/occupationTypesLists'
import s from './styles/Questionary.module.css'
import { QuestionaryItem } from './CompanyDetailItem/QuestionaryItem'
import { setCompanyName } from '../../redux/questionary/slice'
import { useNavigate } from 'react-router-dom';

export default function CompanyDetails() {


  // IoIosArrowBack
  const navigate = useNavigate();

  const dispatch = useDispatch()
  const companyData = useSelector((state) => state.questionary.companyData)
  const companyName = useSelector((state) => state.questionary.companyName)

  const [allFormsData, setAllFormsData] = useState([])
  const [infoData, setInfoData] = useState([]) //данные только по контактам и экономике
  const [formsData, setFormsData] = useState([]) //данные по остальным формам
  const [underPressureEquip, setUnderPressureEquip] = useState([]) //данные форм по оборуд-ю под давл


  console.log(companyData);

  // console.log(companyData);
  //делаем единый объект в котором есть название форм по русски
  useEffect(() => {
    try {
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
        dispatch(setCompanyName(companyData.filter(el => el._id === 'Main')[0].data[1].value))
      }
      setAllFormsData(result)
    } catch (err) {
      console.log('Oshibka', err);
    }


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

  }, [allFormsData, setInfoData])


  console.log(companyData);

  return (
    <Container>
      <Card className={s.card}>
        <Card.Header><span onClick={() => navigate(-1)} className={s.icon}><IoIosArrowBack /></span>{companyName} </Card.Header>
      </Card>
      <Accordion defaultActiveKey='0' flush>
        {infoData.map((el, idx) => (
          <QuestionaryItem questionaryItem={el} idx={`${idx}_${idx}`} id='info' />
        ))}
        <Accordion.Item>
          <Accordion.Header id={'rest'}>
            Оборудование под давлением
          </Accordion.Header>
          <Accordion.Body>
            <Accordion defaultActiveKey='0' flush id='test'>
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
