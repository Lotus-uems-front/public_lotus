import React, { useEffect } from 'react'
import { Accordion, Badge, ListGroup } from 'react-bootstrap'
import { equip } from '../lists/occupationTypesLists'
import s from './styles/Questionary.module.css'

export const QuestionaryItem = ({ questionaryItem, id }) => {
  console.log(questionaryItem)



  const returnFormatedData = (item) => {
    if (typeof item.value === 'boolean' && item.value === true && item.information !== 'Емкости для хранения' && item.information !== '[object Object]') {
      return (
        <ListGroup.Item as='li' className={s.description}>
          <div className='ms-2 me-auto'>
            <div className='fw-bold'>{item.information}</div>
          </div>
          <Badge bg='primary' pill>
            Да
          </Badge>
        </ListGroup.Item>
      )
    }
    if (item.information === 'ФИО руководителя') {
      return (
        <ListGroup.Item as='li' className={s.description}>
          <div className='ms-2 me-auto'>
            <div className='fw-bold'>{item.information}</div>
          </div>
          <Badge bg='primary' pill>{`${item.value[0]} ${item.value[1]} ${item.value[2]}`}</Badge>
        </ListGroup.Item>
      )
    }

    if (typeof item.value === 'string') {
      return (
        <ListGroup.Item as='li' className={s.description}>
          <div className='ms-2 me-auto'>
            <div className='fw-bold'>{item.information}</div>
          </div>
          <Badge bg='primary' pill>
            {item.value}
          </Badge>
        </ListGroup.Item>
      )
    }
    if (equip.some((el) => el === item.description)) {
      if(item.value.some(elem => elem))
      return (
        <ListGroup.Item>
          <ListGroup.Item variant='primary' style={{ marginBottom: '20px' }}>
            {item.description && item.description}
          </ListGroup.Item>
          {item.information.map((el, ind) => {
            if (item.value[ind]) {
              return (
                <div key={el.id} className={`${s.description} ${s.mb_10}`}>
                  <div>
                    <div className='fw-bold'>{el}</div>
                  </div>
                  <Badge bg='primary' pill>
                    Да
                  </Badge>
                </div>
              )
            }
          })}
        </ListGroup.Item>
      )
    }
  }

  return (
    <Accordion.Item eventKey={`${questionaryItem._id}`} className={`${s.accordion_item}`} key={questionaryItem._id}>
      <Accordion.Header className={`${s.accordion_header}`} id={id}>
        {questionaryItem.title}
      </Accordion.Header>
      <Accordion.Body className={`${s.accordion_body}`}>
        {questionaryItem.data.map((item, index) => (
          <>
            {item.value && (
              <ListGroup as='ul' key={index} className={s.description}>
                {returnFormatedData(item)}
              </ListGroup>
            )}{' '}
          </>
        ))}
      </Accordion.Body>
    </Accordion.Item>
  )
}
