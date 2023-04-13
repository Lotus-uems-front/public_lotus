import React from 'react'
import { VscDesktopDownload } from 'react-icons/vsc'
import { MdOutlineOpenInNew } from 'react-icons/md'
import { Table, Form, Badge } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import s from '../../css/MultyColumnTable.module.css'
import { equip } from '../lists/occupationTypesLists'

const MultiColumnTable = ({ data, columns = 2, download }) => {
  const inn = useSelector((state) => state.questionary.inn)

  const formatString = (string, id) => {
    const fileFormats = ['.png', '.jpeg', '.pdf', '.txt']
    const domens = [
      '.ru',
      '.ua',
      '.by',
      '.kz',
      '.com',
      '.pro',
      '.org',
      '.io',
      '.net',
      '.su',
      '.uz',
      '.az',
      '.am',
      '.ge',
      '.kg',
      '.md',
      '.tj',
      '.tm'
    ]
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
    if (
      typeof item.value === 'boolean' &&
      item.value === true &&
      item.information !== 'Емкости для хранения' &&
      item.information !== '[object Object]'
    ) {
      return (
        <>
          <td style={{textTransform: 'capitalize'}}>{item.information}</td>
          <td>
            <Form.Check type='checkbox' checked readOnly />
          </td>
        </>
      )
    } else if (item.information === 'ФИО руководителя') {
      return (
        <>
          <td style={{textTransform: 'capitalize'}}>{item.information}</td>
          <td>
            <Badge>{`${item.value[0]} ${item.value[1]} ${item.value[2]}`}</Badge>
          </td>
        </>
      )
    } else if (typeof item.value === 'string') {
      return (
        <>
          <td style={{textTransform: 'capitalize'}}>{item.fid && item.fid.includes('Fifteen') ? item.description : item.information}</td>
          <td>{formatString(item.value, item.information, item.id)}</td>
        </>
      )
    }
    // else if (
    //     Array.isArray(item.information) &&
    //     Array.isArray(item.value) &&
    //     item.information.length === item.value.length
    //   ) {
    //     return item.information.map((el, idx) => {
    //       if (item.value[idx]) {
    //         return (
    //           <tr key={idx} style={{display: 'flex'}}>
    //             <td>{el}</td>
    //             <td>
    //               <Form.Check type="checkbox" checked readOnly />
    //             </td>
    //           </tr>
    //         );
    //       }
    //       return null;
    //     });
    //   }
    else if (
        Array.isArray(item.information) &&
        Array.isArray(item.value) &&
        item.information.length === item.value.length
      ) {
        return {
          type: 'multiRow',
          data: item.information
            .map((el, idx) => ({
              information: el,
              checked: item.value[idx]
            }))
            .filter((item) => item.checked)
        };
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
        {Array.from({ length: rows }).map((_, rowIndex) => {
          const cellContent = Array.from({ length: columns }).map((_, columnIndex) => {
            const content = renderCell(rowIndex, columnIndex)
            return (
              <React.Fragment key={columnIndex}>
                {content && content.type === 'multiRow' ? null : content}
              </React.Fragment>
            )
          })

          const multiRowContent = Array.from({ length: columns }).flatMap((_, columnIndex) => {
            const content = renderCell(rowIndex, columnIndex)
            if (content && content.type === 'multiRow') {
              return content.data.map((item, idx) => {
                  return <tr key={`${rowIndex}-${columnIndex}-${idx}`}>
                    <td style={{textTransform: 'capitalize'}}>{item.information}</td>
                    <td>{item.checked ? <Form.Check type='checkbox' checked readOnly /> : null}</td>
                  </tr>
                
              })
            }
            return []
          })

          return [<tr key={rowIndex}>{cellContent}</tr>, ...multiRowContent]
        })}
      </tbody>
    </Table>
    // <Table bordered>
    //   <tbody>
    //     {Array.from({ length: rows }).map((_, rowIndex) => (
    //       <tr key={rowIndex}>
    //         {Array.from({ length: columns }).map((_, columnIndex) => (
    //           <React.Fragment key={columnIndex}>{renderCell(rowIndex, columnIndex)}</React.Fragment>
    //         ))}
    //       </tr>
    //     ))}
    //   </tbody>
    // </Table>
  )
}

export default MultiColumnTable
