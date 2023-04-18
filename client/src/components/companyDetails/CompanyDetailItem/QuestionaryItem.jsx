import React from 'react'
import { Accordion, Badge, Form, ListGroup, Table } from 'react-bootstrap'
import { equip } from '../../../assets/lists/occupationTypesLists'
import s from '../../../css/Questionary.module.css'
import downloadFile from '../../../assets/downLoadFile'
import MultiColumnTable from '../../../assets/MultyColumnTable/MultyColumnTable'

export const QuestionaryItem = ({ questionaryItem, id, colNum }) => {
  // console.log(questionaryItem)

  const download = (fileName, login, id) => {
    ;(async () => {
      try {
        const result = await downloadFile(fileName, login, id) // ? Почему то в id передается полный путь до файла
        if (result) {
          const link = document.createElement('a')
          link.href = result
          link.download = fileName //! меняем имя файла при загрузке
          document.body.appendChild(link)
          link.click()
          link.remove()
        }
      } catch (err) {
        console.log(`Ошибка при загрузке файла: `, err)
      }
    })()
  }

  const filteredData = questionaryItem.data.filter((item) => item.id)

  // console.log(filteredData);

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
        <MultiColumnTable
          data={filteredData}
          columns={colNum}
          download={download}
          qi={questionaryItem}
        />
      </Accordion.Body>
    </Accordion.Item>
  )
}
