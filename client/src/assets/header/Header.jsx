import React from 'react'
import { MdTune } from 'react-icons/md'
import { useLocation, useNavigate } from 'react-router-dom'
import { IconContext } from 'react-icons/lib'
import { Alert, Button } from 'react-bootstrap'
import s from '../../css/Header.module.css'
import BackButton from '../BackButton/BackButton'
import { useSelector } from 'react-redux'

export default function Header({ searchedParam, companiesCount, isBackBtnNeeded, filterPath, isSearched }) {
  const location = useLocation()
  const isFilterNeeded = location.pathname.includes('occupation')
  const companyName = useSelector((state) => state.questionary.companyName)


  const navigate = useNavigate()

  return (
    <Alert className={`${s.mb_0} ${s.size}`}>
      <span className={s.span_content}>
        <span className={s.cursor_pointer}>
          {isBackBtnNeeded && <BackButton className={s.back_btn} />}

          {isSearched ? <span className={isBackBtnNeeded ? s.ml_10 : ''}>По запросу <b>"{searchedParam}"</b> найдено результатов: <b>{companiesCount}</b>{' '}</span> : <span className={isBackBtnNeeded ? s.ml_10 : ''}>Данные по компании: <b>{companyName}</b> </span>}
        </span>
        
        {isFilterNeeded && (
          <Button onClick={() => navigate(filterPath)}>
            Фильтр
            <IconContext.Provider value={{ style: { cursor: 'pointer', fontSize: '20px', marginLeft: '5px' } }}>
              <MdTune />
            </IconContext.Provider>
          </Button>
        )}
      </span>
    </Alert>
  )
}
