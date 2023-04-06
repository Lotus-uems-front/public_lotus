import React from 'react'
import { Accordion, Badge, Form, ListGroup, Table } from 'react-bootstrap'
import { FaDownload } from 'react-icons/fa'
import { equip } from '../../../assets/lists/occupationTypesLists'
import s from '../../../css/Questionary.module.css'
import ListGroupItem from './ListGroupItem'
import { useSelector } from 'react-redux'
import { companiesDataApi } from '../../../api/api'
import downloadFile from '../../../assets/downLoadFile'

export const QuestionaryItem = ({ questionaryItem, id }) => {
  // console.log(questionaryItem)

  const download = async (fileName, login, id) => {
    const result = await downloadFile(fileName, login, id);

    // console.log(this.state.copyNameFile); // test

    if (result) {
        // console.log(`RESULT !!!!!!!!!!!!!!!!!! >>>>>>>>>>> `, result); // test

        const linkBlob = window.URL.createObjectURL(result);
        const link = document.createElement('a');
        link.href = linkBlob
        link.download = fileName//! меняем имя файла при загрузке
        document.body.appendChild(link)
        link.click()
        link.remove()
    }
    
  }

  const inn = useSelector((state) => state.questionary.inn)

  const formatString = (string, id) => {
    if (
      isNaN(string) &&
      string !== 'Да' &&
      string !== 'Нет' &&
      !string.includes('@') &&
      !string.includes('.png') &&
      !string.includes('.jpeg')
    ) {
      return <Badge>{string}</Badge>
    } else if (string === 'Да') {
      return <Form.Check type='checkbox' checked readOnly/>
    } else if (string === 'Нет') {
      return <Form.Check type='checkbox' checked={false} readOnly/>
    } else if (string.includes('@')) {
      return <a href={`mailto:${string}`}>{string}</a>
    } else if (string.includes('.png') || string.includes('.jpeg')) {
      return (
        <div
          style={{ textAlign: 'center', cursor: 'pointer', color: 'blue' }}
          onClick={() => download(string, inn, id)}
        >
          <FaDownload />
        </div>
      )
    } else {
      return string
    }
  }

  const returnFormatedData = (item) => {
    if (
      typeof item.value === 'boolean' &&
      item.value === true &&
      item.information !== 'Емкости для хранения' &&
      item.information !== '[object Object]'
    ) {
      return (
        // <ListGroupItem item={item} insideBadge='Да' />

        <>
          <td>{item.information}</td>
          <td>{<Form.Check type='checkbox' checked readOnly/>}</td>
        </>
      )
    }
    if (item.information === 'ФИО руководителя') {
      return (
        // <ListGroupItem
        //   item={item}
        //   insideBadge={`${item.value[0]} ${item.value[1]} ${item.value[2]}`}
        // />
        <>
          <td>{item.information}</td>
          <td>
            <Badge>{`${item.value[0]} ${item.value[1]} ${item.value[2]}`}</Badge>
          </td>
        </>
      )
    }

    if (typeof item.value === 'string') {
      item.fid.includes('Fifteen') && console.log(item)
      return (
        // <ListGroupItem item={item} insideBadge={item.value} />

        <>
          <td>{item.fid.includes('Fifteen') ? item.description : item.information}</td>
          {/* <td>{isNaN(item.value) ? <Badge>{item.value}</Badge> : item.value}</td> */}
          <td>{formatString(item.value, item.information, item.id)}</td>
        </>
      )
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

  // console.log(inn)
  return (
    <Accordion.Item
      eventKey={`${questionaryItem._id}`}
      className={`${s.accordion_item}`}
      key={questionaryItem._id}
    >
      <Accordion.Header className={`${s.accordion_header}`} id={id}>
        {questionaryItem.title}
      </Accordion.Header>
      <Accordion.Body className={`${s.accordion_body}`}>
        <Table bordered>
          {questionaryItem.data.map((item, index) => (
            <tbody key={index}>
              {item.value && (
                // <ListGroup as='ul' key={index} className={s.description}>
                //   {returnFormatedData(item)}
                // </ListGroup>

                <tr>{returnFormatedData(item)}</tr>
              )}{' '}
            </tbody>
          ))}{' '}
        </Table>
      </Accordion.Body>
    </Accordion.Item>
  )
}
