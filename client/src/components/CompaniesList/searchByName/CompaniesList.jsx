import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Highlighter from 'react-highlight-words'
import { Alert, Badge, Button, Container, Table } from 'react-bootstrap'
import { MdOutlineOpenInNew } from 'react-icons/md'
import { AiOutlineCaretLeft, AiOutlineCaretRight } from 'react-icons/ai'
import s from '../style/CompaniesList.module.css'
import loadImageUrl from '../../../assets/loadImageUrl'
import { setCurrentPage, setIconUrl } from '../../../redux/searchResult/slice'

export default function CompaniesList({ companies, searchedName, searchParamOccupation }) {

  useEffect(() => {
    setObjectWithIcons()
  }, [companies.length])

  const dispatch = useDispatch()
  const currentPage = useSelector((state) => state.search.currentPage)
  const [url, setUrl] = useState('')

  // console.log(iconUrl);

  const pageUp = () => {
    dispatch(setCurrentPage(currentPage + 1))
  }

  const pageDown = () => {
    if (currentPage !== 0) {
      dispatch(setCurrentPage(currentPage - 1))
    }
  }

  // ! ниже пример получения иконки
  useEffect(() => {
    ; (async () => {
      const urlIcon = await loadImageUrl('icon_logo', '2222222222') // (файл, ИНН)
      setUrl(urlIcon)
    })()

  }, [])

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

  const location = useLocation()


  const setHeader = () => {
    if (location.pathname.includes('search')) {
      return <span>По запросу <b>"{searchedName}"</b> найдено {filteredInfo.length} результатов:</span>
    }
    // когда будет вся длина массива, будет отображаться не 10, а сколько в общ сложности
    if (location.pathname.includes('occupation')) {
      return <span>По запросу: <b>"{searchParamOccupation}"</b> найдено {filteredInfo.length} результатов:</span>
    }
  }

  if (filteredInfo.length)
    return (
      <div className={s.wrapper}>
        <Container>
          <Alert variant='light'>{setHeader()}</Alert>
          <Table className={s.table}>
            <thead className={s.table_head}>
              <tr>
                <th>#</th>
                <th> logo </th>
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
                      {' '}
                      <img src={url} alt='logo' width={40} height={40} />{' '}
                    </td>
                    <td>
                      <Highlighter
                        //  highlightClassName={s.highlight}
                        searchWords={[searchedName]}
                        autoEscape={true}
                        textToHighlight={`${ownership} ${name}`}
                      />
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
                      <Link
                        to={{
                          pathname: '/data-company/',
                          search: `?inn=${inn}`,
                          state: location.pathname
                        }}
                      >
                        <Button variant='outline-info'>
                          Подробно
                          <span className={s.detailsIcon}>
                            <MdOutlineOpenInNew />
                          </span>
                        </Button>
                      </Link>
                    </td>
                  </tr>
                </tbody>
              )
            })}
          </Table>
          <div className={s.paginationButtonGroup}>
            <Button disabled={currentPage === 1} onClick={pageDown}>
              <AiOutlineCaretLeft />
            </Button>
            <Button onClick={pageUp}>
              <AiOutlineCaretRight />
            </Button>
          </div>
        </Container>
      </div>
    )
}
