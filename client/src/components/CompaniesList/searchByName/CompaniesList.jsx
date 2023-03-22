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
// import {  loadImageUrl } from '../../../redux/searchResult/slice'

export default function CompaniesList({ companies, searchedName, searchParamOccupation }) {

  useEffect(() => {
    setObjectWithIcons()
  }, [companies.length])

  const dispatch = useDispatch()
  const currentPage = useSelector((state) => state.search.currentPage)
  const iconUrl = useSelector((state) => state.search.iconUrl)
  const [fullCompaniesArray, setFullCompaniesArray] = useState([])


  const pageUp = () => {
    dispatch(setCurrentPage(currentPage + 1))
  }

  const pageDown = () => {
    if (currentPage !== 0) {
      dispatch(setCurrentPage(currentPage - 1))
    }
  }

  const setObjectWithIcons = async () => {
    if (companies.length) {
      const objectInPromise =
        Promise.all(companies.map(async (company) => {
          // const url = await dispatch(loadImageUrl('icon_logo', company.data[6].value))
          // const { payload: url } = await dispatch(loadImageUrl('icon_logo', company.data[6].value))
          const url = await loadImageUrl('icon_logo', company.data[6].value)
          return {
            name: company.data[1].value,
            country: company.data[14].value,
            city: company.data[15].value,
            inn: company.data[6].value,
            tel: company.data[111].value,
            email: company.data[112].value,
            ownership: !company.data[100].value || company.data[100].value === 'Форма собственности компании' ? '' : company.data[100].value,
            url: url
          }
        }))

      const objWithIcon = await objectInPromise
      setFullCompaniesArray(objWithIcon)
      console.log(`:::`, objWithIcon);
    }

  }
  const location = useLocation()

  const setHeader = () => {
    if (location.pathname.includes('search')) {
      return <span>По запросу <b>"{searchedName}"</b> найдено {fullCompaniesArray.length} результатов:</span>
    }
    // когда будет вся длина массива, будет отображаться не 10, а сколько в общ сложности
    if (location.pathname.includes('occupation')) {
      return <span>По запросу: <b>"{searchParamOccupation}"</b> найдено {fullCompaniesArray.length} результатов:</span>
    }
  }

  // console.log(fullCompaniesArray);
  if (fullCompaniesArray.length)
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
            {fullCompaniesArray.map((company, idx) => {
              const { ownership, name, inn, tel, email, country, city, url } = company
              // console.log(name, url);
              return (
                <tbody className={s.table_body} key={inn}>
                  <tr className={s.table_row}>
                    <td>{idx + 1}</td>
                    <td>
                      {' '}
                      <img src={url} alt='logo' width={40} height={40} className={s.companyLogo} />{' '}
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