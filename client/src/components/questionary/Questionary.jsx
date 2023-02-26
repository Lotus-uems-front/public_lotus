import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchPosts, getCompanyData } from '../../redux/questionary/slice'
import { CiMoneyCheck1 } from "react-icons/ci"
import Card from 'react-bootstrap/Card'
import Accordion from 'react-bootstrap/Accordion'
import Container from 'react-bootstrap/Container'
import Button from 'react-bootstrap/Button'
import s from './styles/Questionary.module.css'

// CiMoneyCheck1

export default function Questionary() {
  const dispatch = useDispatch()
  const companyData = useSelector((state) => state.questionary.companyData)
  const [inn, setInn] = useState('') // ИНН из строки URL

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

  console.log(companyData)
  return (
    <Container className={s.container}>
      <Accordion defaultActiveKey='0' flush className={s.accordion}>
        <div className={s.test}></div>
        {companyData.map((el, idx) => (
          <Accordion.Item eventKey={idx} key={el._id} >
            <Accordion.Header className={s.accordion_header}><span>{el._id}</span></Accordion.Header>
            <Accordion.Body className={s.accordion_body}>
              <Card style={{ width: '18rem', textAlign: 'center' }}>
                <Card.Body>
                  <Card.Title className={s.card_title}><CiMoneyCheck1 /></Card.Title>
                  <Card.Title>{el._id}</Card.Title>
                  <Card.Text>Some quick example text to build on the card title and make up the bulk of the card's content.</Card.Text>
                  {/* <Card.Link href='#'>Card Link</Card.Link>
                <Card.Link href='#'>Another Link</Card.Link> */}
                  <Button variant='success'>Перейти</Button>
                </Card.Body>
              </Card>
            </Accordion.Body>
          </Accordion.Item>
        ))}
      </Accordion>
    </Container>

  )
}
