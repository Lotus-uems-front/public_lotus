import React from 'react'
import { Badge, ListGroup } from 'react-bootstrap'
import s from '../styles/Questionary.module.css'

export default function ListGroupItem({ item, insideBadge }) {
  return (
    <ListGroup.Item as='li' className={s.description}>
      <div className='ms-2 me-auto'>
        <div className='fw-bold'>{item.information}</div>
      </div>
      <Badge bg='primary' pill>
        {insideBadge}
      </Badge>
    </ListGroup.Item>
  )
}
