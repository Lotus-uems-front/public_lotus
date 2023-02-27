import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts, getCompanyData, getFilteredCompanyData } from '../../redux/questionary/slice'
import Accordion from 'react-bootstrap/Accordion'
import Container from 'react-bootstrap/Container'
import s from './styles/Questionary.module.css'
import { fullInfo } from '../lists/occupationTypesLists'

// CiMoneyCheck1

export default function Questionary() {
  const dispatch = useDispatch()
  const companyData = useSelector((state) => state.questionary.companyData)
  const filteredOccupationNames = useSelector((state) => state.questionary.filteredCompanyData)
  const [inn, setInn] = useState('') // ИНН из строки URL

  const [filteredCompanyData, setFilteredCompanyData] = useState([])
  const [generalData, setGeneralData] = useState([])
  const [occupationalData, setOccupationalData] = useState([])

  // отслеживаем URL
  useEffect(() => {
    const link = window.location.href;
    const url = new URL(link)
    const innLink = url.searchParams.get('inn');
    setInn(innLink);
  }, [])



  useEffect(() => {
    const response = dispatch(fetchPosts(inn))
    if (response.length) {
      dispatch(getCompanyData(response))
    }
  }, [inn])

  useEffect(() => {
    if(companyData.length){
      const intersection = []
      const filteredData = []
      companyData.forEach((el) => {
         fullInfo.forEach(item => {
           if(el._id === item.name){
            intersection.push(item.title); 
            filteredData.push(el)
           }
         })
       })
      //  setFilteredCompanyData(intersection)
      setFilteredCompanyData(filteredData)
       dispatch(getFilteredCompanyData(intersection))
       

    }

  }, [companyData])

 console.log(filteredCompanyData);
  
  return (
    <Container className={s.container}>
      <Accordion defaultActiveKey='0' flush className={s.accordion}>
        <div className={s.test}></div>
        {filteredOccupationNames.map((el, idx) => (
          <Accordion.Item eventKey={idx} key={el} >
            <Accordion.Header className={s.accordion_header}><span>{el}</span></Accordion.Header>
            <Accordion.Body className={s.accordion_body}>
{filteredCompanyData && filteredCompanyData[idx] && filteredCompanyData[idx].data.map(el => (
   <div key={el._id}>{el.value && el.information + ' ' + el.value }</div> 
    
  ))}
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>

  )
}
