import React, { useState, useEffect, useMemo } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Highlighter from 'react-highlight-words'
import { Alert, Badge, Button, Container, Table } from 'react-bootstrap'
import { MdOutlineOpenInNew } from 'react-icons/md'
import { MdTune } from 'react-icons/md'
import s from '../../css/CompaniesList.module.css'
import loadImageUrl from '../../assets/loadImageUrl'
import { setCurrentPage } from '../../redux/searchResult/slice'
import PaginationO from '../../assets/Pagination'
import { IconContext } from 'react-icons/lib'

export default function CompaniesList({ companies, searchedParam, companiesCount, filterPath }) {
  useEffect(() => {
    setObjectWithIcons()
  }, [companies.length])

  const dispatch = useDispatch()
  const currentPage = useSelector((state) => state.search.currentPage)
  const [fullCompaniesArray, setFullCompaniesArray] = useState([])
  const pagesCount = useMemo(() => Math.ceil(companiesCount / 10), [companiesCount])

  const paginate = (pageNumber) => {
    dispatch(setCurrentPage(pageNumber))
  }

  const setObjectWithIcons = async () => {
    if (companies.length) {
      const objectInPromise = Promise.all(
        companies.map(async (company) => {
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
        })
      )

      const objWithIcon = await objectInPromise
      setFullCompaniesArray(objWithIcon)
    }
  }
  const location = useLocation()
  const navigate = useNavigate()

  // console.log(location.pathname.includes('occupation'));
  const isFilterNeeded = location.pathname.includes('occupation')

  const setHeader = () => {
    return (
      <span style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>
          По запросу <b>"{searchedParam}"</b> найдено результатов: <b>{companiesCount}</b>{' '}
        </span>
        {isFilterNeeded && 
        <Button onClick={() => navigate(filterPath)}>
          Фильтр
           <IconContext.Provider value={{ style: { cursor: 'pointer', fontSize: '20px', marginLeft: '5px' } }}>
          <MdTune  />
        </IconContext.Provider>
        </Button>
       }
      </span>
    )
  }

  if (fullCompaniesArray.length)
    return (
      <div className={s.wrapper}>
        <Container>
          {/* <Alert variant='light'>{setHeader()}</Alert> */}
          <Table className={s.table}>
            <thead className={s.table_head}>
              <tr>
                <th>#</th>
                <th> Название </th>
                <th>Город</th>
                <th>Телефон</th>
                <th>Почта</th>
              </tr>
            </thead>
            {fullCompaniesArray.map((company, idx) => {
              const { ownership, name, inn, tel, email, country, city, url } = company
              return (
                <tbody className={s.table_body} key={inn}>
                  <tr className={s.table_row}>
                    <td>{idx + 1}</td>
                    <td className={s.logoSection}>
                      <img src={url} alt='logo' className={s.companyLogo} />{' '}
                      <div>
                        <div>
                          <Highlighter searchWords={[searchedParam]} autoEscape={true} style={{ fontWeight: 'bold' }} textToHighlight={`${ownership} ${name}`} />
                          <div className={s.inn}>ИНН: {inn}</div>
                        </div>
                      </div>
                    </td>
                    <td className={s.city}>{`${city} ${country ? `(${country})` : ''} `}</td>
                    <td className={s.tel}>{tel}</td>
                    <td>{email && <Badge className={s.email}>{email}</Badge>}</td>
                    <td>
                      <Link
                        to={{
                          pathname: '/data-company/',
                          search: `?inn=${inn}`,
                          state: location.pathname,
                          prevRoute: location.pathname
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
            <PaginationO pagesCount={pagesCount} paginate={paginate} currentPage={currentPage} />
          </div>
        </Container>
      </div>
    )
}
