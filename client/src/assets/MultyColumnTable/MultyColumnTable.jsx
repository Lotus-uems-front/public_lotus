import React from 'react'
import { VscDesktopDownload } from 'react-icons/vsc'
import { MdOutlineOpenInNew } from 'react-icons/md'
import { Table, Form, Badge } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import s from '../../css/MultyColumnTable.module.css'
import { domens, fileFormats } from '../lists/formatsLists'

const MultiColumnTable = ({ data, columns = 2, download, qi }) => {
 
  const inn = useSelector((state) => state.questionary.inn)

  // console.log(data);

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
  
  const processedDescriptions = new Set();
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
          <td style={{ textTransform: 'capitalize' }}>{item.information}</td>
          <td>
            <Form.Check type='checkbox' checked readOnly />
          </td>
        </>
      )
    } else if (item.information === 'ФИО руководителя') {
      return (
        <>
          <td style={{ textTransform: 'capitalize' }}>{item.information}</td>
          <td>
            <Badge>{`${item.value[0]} ${item.value[1]} ${item.value[2]}`}</Badge>
          </td>
        </>
      )
    } else if (typeof item.value === 'string' && !item.fid.includes('Zero_')) {
      return (
        <>
          <td style={{ textTransform: 'capitalize' }}>
            {item.fid && item.fid.includes('Fifteen') ? item.description : item.information}
          </td>
          <td>{formatString(item.value, item.information, item.id)}</td>
        </>
      )
    } 

    if (item.fid.includes("Zero_")) {
      if (!processedDescriptions.has(item.description)) {
        processedDescriptions.add(item.description);
        let content = [];
  
        if (Array.isArray(item.information) && Array.isArray(item.value)) {
          item.information.forEach((info, index) => {
            if (item.value[index] === true) {
              content.push(<li key={index}>{info}</li>);
            }
          });
        } else if (
          typeof item.information === "string" &&
          typeof item.value === "string"
        ) {
          content.push(
            <div key="infoValue">
              {item.information}: {item.value}
            </div>
          );
        }
  
        return (
          <>
            <td>
              <h3>{item.description}</h3>
              <ul>{content}</ul>
            </td>
          </>
        );
      }
    } 
    
    else {
      return null
    }
  }

  const renderCell = (rowIndex, columnIndex) => {
    const index = rowIndex * columns + columnIndex
    if (index >= data.length) return null

    return renderCellContent(data[index])
  }

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
