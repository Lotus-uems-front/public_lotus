import React, { useEffect } from 'react'
import { Accordion, Badge, ListGroup } from 'react-bootstrap'
import { equip } from '../../../assets/lists/occupationTypesLists'
import s from '../../../css/Questionary.module.css'
import ListGroupItem from './ListGroupItem'

export const QuestionaryItem = ({ questionaryItem, id }) => {
  // console.log(questionaryItem)

  const returnFormatedData = (item) => {
    if (typeof item.value === 'boolean' && item.value === true && item.information !== 'Емкости для хранения' && item.information !== '[object Object]') {
      return <ListGroupItem item={item} insideBadge='Да' />
    }
    if (item.information === 'ФИО руководителя') {
      return <ListGroupItem item={item} insideBadge={`${item.value[0]} ${item.value[1]} ${item.value[2]}`} />
    }

    if (typeof item.value === 'string') {
      return <ListGroupItem item={item} insideBadge={item.value} />
    }
    if (equip.some((el) => el === item.description)) {
      if (item.value.some((elem) => elem))
        return (
          <ListGroup.Item>
            <ListGroup.Item variant='primary' className={s.mb_20}>
              {item.description && item.description}
            </ListGroup.Item>
            {item.information.map((el, ind) => {
              if (item.value[ind]) {
                return (
                  <div key={el.id} className={`${s.description} ${s.under_press_equip_body}`}>
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
