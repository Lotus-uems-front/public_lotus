import React, { useEffect } from 'react'
import { Accordion, Badge, ListGroup } from 'react-bootstrap'
import s from './styles/Questionary.module.css'

export const QuestionaryItem = ({ questionaryItem, idx, id }) => {
  console.log(questionaryItem)

  const equip = ['Емкости без внутренних устройств', 'Емкости с внутренними устройствами', 'Емкости с перемешивающими устройствами', 'Емкости для хранения']

  const returnFormatedData = (item) => {
    if (typeof item.value === 'boolean' && item.value === true) {
      return (
        <ListGroup.Item as='li' className={s.description} >
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
        <ListGroup.Item as='li' className={s.description} >
          <div className='ms-2 me-auto'>
            <div className='fw-bold'>{item.information}</div>
          </div>
          <Badge bg='primary' pill>{`${item.value[0]} ${item.value[1]} ${item.value[2]}`}</Badge>
        </ListGroup.Item>
      )
    }

    if (typeof item.value === 'string') {
      return (
        <ListGroup.Item as='li' className={s.description} >
          <div className='ms-2 me-auto'>
            <div className='fw-bold'>{item.information}</div>
          </div>
          <Badge bg='primary' pill>
            {item.value}
          </Badge>
        </ListGroup.Item>
      )
    }

    if (item.description === 'Емкости без внутренних устройств' || item.description === 'Емкости с внутренними устройствами' ||
    item.description === 'Емкости с перемешивающими устройствами' ||  item.description === 'Емкости для хранения') {
      return (
       <ListGroup.Item >
          <h4>{item.description}:</h4>
          {item.information.map((el, ind) => {
            if (item.value[ind]) {
              return (
                <div className={`${s.description} ${s.mb_10}`}>
                  <div className=''>
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
                {/* <ListGroup.Item as='li' > */}
                  {/* <>
                    <div className='ms-2 me-auto'>
                      <div className='fw-bold'>{item.information}</div>
                    </div>
                    <Badge bg='primary' pill>
                      {returnFormatedData(item)}
                    </Badge>
                  </> */}
                  {returnFormatedData(item)}
                {/* </ListGroup.Item> */}
              </ListGroup>
            )}
          </>
        ))}
      </Accordion.Body>
    </Accordion.Item>
  )
}
