import React, { useEffect, useState } from 'react'
import { VscDesktopDownload } from 'react-icons/vsc'
import { MdOutlineOpenInNew } from 'react-icons/md'
import { Table, Form, Badge, Accordion, ListGroup } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import s from '../../css/MultyColumnTable.module.css'
import { domens, fileFormats } from '../lists/formatsLists'
import { equip } from '../lists/occupationTypesLists'

const MultiColumnTable = ({ data, columns = 2, download, qi }) => {
  const inn = useSelector((state) => state.questionary.inn)

  const [sizes, setSizes] = useState([])

  // console.log(data);

  const processData = () => {
    if (
      data.some((el) => el.fid.includes('Zero') || equip.forEach((item) => item === el.description))
    ) {
      const grouped = data.reduce((result, item) => {
        const key = item.description
        const value = { information: item.information, value: item.value }

        if (!result[key]) {
          result[key] = []
        }

        result[key].push(value)
        return result
      }, {})

      const newArray = Object.entries(grouped).map(([name, sizes]) => {
        return { name, sizes }
      })

      setSizes(newArray)
    }

    // console.log(sizes)
  }

  const formatString = (string, id) => {
    if (
      isNaN(string) &&
      string !== 'Да' &&
      string !== 'Нет' &&
      !string.includes('@') &&
      fileFormats.every((el) => !string.includes(el)) &&
      domens.every((el) => !string.includes(el))
    ) {
      return <Badge>{string}</Badge>
    } else if (string === 'Да') {
      return <Form.Check type='checkbox' checked readOnly />
    } else if (string === 'Нет') {
      return <Form.Check type='checkbox' checked={false} readOnly />
    } else if (string.includes('@')) {
      return <a href={`mailto:${string}`}>{string}</a>
    } else if (fileFormats.some((el) => string.includes(el))) {
      return (
        <div className={s.downloadIconDiv} onClick={() => download(string, inn, id)}>
          <h4>
            <VscDesktopDownload />
          </h4>
        </div>
      )
    } else if (domens.some((el) => string.includes(el))) {
      return (
        <a href={string} target='_blank'>
          {string} <MdOutlineOpenInNew />
        </a>
      )
    } else {
      return string
    }
  }

  const rows = Math.ceil(data.length / columns)

  const renderCellContent = (item) => {
    // console.log(item);
    if (
      typeof item.value === 'boolean' &&
      item.value === true &&
      item.information !== 'Емкости для хранения' &&
      item.information !== '[object Object]' &&
      !item.fid.includes('Zero_')
    ) {
      return (
        <>
          <td>{item.information}</td>
          <td>
            <Form.Check type='checkbox' checked readOnly />
          </td>
        </>
      )
    } else if (item.information === 'ФИО руководителя') {
      return (
        <>
          <td>{item.information}</td>
          <td>
            <Badge>{`${item.value[0]} ${item.value[1]} ${item.value[2]}`}</Badge>
          </td>
        </>
      )
    } else if (typeof item.value === 'string' && !item.fid.includes('Zero_')) {
      return (
        <>
          <td>{item.fid && item.fid.includes('Fifteen') ? item.description : item.information}</td>
          <td>{formatString(item.value, item.information, item.id)}</td>
        </>
      )
    }

    if (item.fid.includes('Zero_')) {
      if (item.objectsArray && item.objectsArray.some((el) => el.value)) {
        return (
          <Accordion defaultActiveKey='0'>
            <Accordion.Item eventKey={item.id}>
              <Accordion.Header className={s.acc_header}>{item.description}</Accordion.Header>
              <Accordion.Body className={s.acc_body_sizes}>
                <span className={s.size}>Размеры:</span>
                {sizes.map((sz) => {
                  if (sz.name === item.description) {
                    return sz.sizes.map((el, idx) => {
                      return !isNaN(el.value) ? (
                        <span
                          key={`${el.information}_${el.value}_${idx}`}
                          className={s.sizes_item}
                        >
                          {el.information}: <Badge>{el.value}</Badge>
                        </span>
                      ) : null
                    })
                  }
                })}
              </Accordion.Body>

              {item.objectsArray.map((el, idx) => {
                return (
                  el.value && (
                    <Accordion.Body className={s.acc_body_equipment} key={`${el.information}_${el.value}_${idx}`} >
                      <div className={s.list_item}>
                        {el.information}
                        <Form.Check type='checkbox' checked readOnly />
                      </div>
                    </Accordion.Body>
                  )
                )
              })}
            </Accordion.Item>
          </Accordion>
        )
      }
    } else {
      return null
    }
  }

  const renderCell = (rowIndex, columnIndex) => {
    const index = rowIndex * columns + columnIndex
    if (index >= data.length) return null

    return renderCellContent(data[index])
  }

  useEffect(() => {
    processData()
  }, [])

  return (
    <Table bordered>
      <tbody>
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <tr key={rowIndex}>
            {Array.from({ length: columns }).map((_, columnIndex) => (
              <React.Fragment key={columnIndex}>{renderCell(rowIndex, columnIndex)}</React.Fragment>
            ))}
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

export default MultiColumnTable
