import React, { useEffect, useState } from 'react'
import { Accordion, Card, Container } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import {
  chemicalEquipmentManufacturing,
  fullInfo,
  individualForms
} from '../../assets/lists/occupationTypesLists'
import s from '../../css/Questionary.module.css'
import { QuestionaryItem } from './CompanyDetailItem/QuestionaryItem'
import { setCompanyName } from '../../redux/questionary/slice'
import MultiColumnTable from '../../assets/MultyColumnTable/MultyColumnTable'

export default function CompanyDetails({ firstEnterPath, setHeader }) {
  const dispatch = useDispatch()
  const companyData = useSelector((state) => state.questionary.companyData)
  const companyName = useSelector((state) => state.questionary.companyName)

  const [allFormsData, setAllFormsData] = useState([])
  const [infoData, setInfoData] = useState([]) //данные только по контактам и экономике
  const [formsData, setFormsData] = useState([]) //данные по остальным формам
  const [underPressureEquip, setUnderPressureEquip] = useState([]) //данные форм по оборуд-ю под давл

  const [processedEquip, setProcessedEquip] = useState([])

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
        dispatch(setCompanyName(companyData.filter((el) => el._id === 'Main')[0].data[1].value))
      }
      setAllFormsData(result)
    } catch (err) {
      console.log('Error fetching company details', err)
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

    // processEquipmentUnderPress(underPressureEquip)

  }, [allFormsData, setInfoData])

  const processEquipmentUnderPress = (dataArray) => {
    dataArray.forEach((dataItem) => {
      dataItem.data = dataItem.data.map((item) => {
        if (Array.isArray(item.information) && Array.isArray(item.value)) {
          const objectsArray = item.information.map((info, index) => ({
            information: info,
            value: item.value[index]
          }))

          return {
            ...item,
            objectsArray
          }
        } else {
          return item
        }
      })
    })
    setProcessedEquip(dataArray)
  }

  useEffect(()=> {
    if(underPressureEquip.length > 0){
      processEquipmentUnderPress(underPressureEquip)
    }

  }, [underPressureEquip,
    processedEquip])


    //  console.log(processedEquip)

  return (
    <Container className={s.fs_20}>
      {setHeader()}
      <Card className={s.card}>
        <Card.Header>{companyName}</Card.Header>
      </Card>
      <Accordion defaultActiveKey='0' flush>
        {infoData.map((el, idx) => (
          <QuestionaryItem
            questionaryItem={el}
            idx={`${idx}_${idx}`}
            id='info'
            colNum={el._id === 'Main' ? 2 : 1}
          />
        ))}
        <Accordion.Item>
          <Accordion.Header id={'rest'}>Оборудование под давлением</Accordion.Header>
          <Accordion.Body>
            <Accordion defaultActiveKey='0' flush>
              {processedEquip.length > 0 && processedEquip.map((el, idx) => (
                  <QuestionaryItem questionaryItem={el} idx={idx} id={'pressure'} colNum={1} />
                ))}
            </Accordion>
          </Accordion.Body>
        </Accordion.Item>
        {formsData.map((el, idx) => (
          <QuestionaryItem questionaryItem={el} idx={idx} id='rest' colNum={1} />
        ))}
      </Accordion>
    </Container>
  )
}
