import React from 'react'
import { Link } from 'react-router-dom'
import { Badge, Button, Container, Table } from 'react-bootstrap'
import { MdOutlineOpenInNew } from 'react-icons/md'
import s from '../style/CompaniesList.module.css'

export default function CompaniesList({ companies }) {
  // console.log(companies)

  // MdOutlineOpenInNew
  // AiOutlineInfoCircle

  const filteredInfo =
    companies.length &&
    companies.map((company) => {
      return {
        name: company.data[1].value,
        country: company.data[14].value,
        city: company.data[15].value,
        inn: company.data[6].value,
        tel: company.data[111].value,
        email: company.data[112].value,
        ownership: !company.data[100].value || company.data[100].value === 'Форма собственности компании' ? '' : company.data[100].value
      }
    })

  if (filteredInfo.length)
    return (
      <div className={s.wrapper}>
        <Container>
          <Table className={s.table} >
            <thead className={s.table_head}>
              <tr>
                <th>#</th>
                <th>Название</th>
                <th>Город</th>
                <th>ИНН</th>
                <th>Телефон</th>
                <th>Почта</th>
              </tr>
              <div id={s.test} className={s.test}></div>
            </thead>
            {filteredInfo.map((company, idx) => {
              const { ownership, name, inn, tel, email, country, city } = company
              return (
                <tbody className={s.table_body} key={inn}>
                  <tr className={s.table_row}>
                    <td>{idx + 1}</td>
                    <td>
                      <b>{`${ownership} ${name}`}</b>
                    </td>
                    <td>{`${city} ${country ? `(${country})` : ''} `}</td>
                    <td>
                      <Badge bg='warning'>{inn}</Badge>
                    </td>
                    <td>{tel}</td>
                    <td>
                      <Badge>{email}</Badge>
                    </td>
                    <td>
                      <Link to={`/data-company/?inn=${inn}`}>
                        <Button variant='outline-info'>
                          Подробно
                          <span className={s.detailsIcon}><MdOutlineOpenInNew/></span> 
                        </Button>
                         
                      </Link>
                    </td>
                  </tr>
                </tbody>
              )
            })}
          </Table>
        </Container>
      </div>
    )
}
