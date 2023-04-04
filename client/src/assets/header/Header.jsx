import React, { useState } from 'react'
import { MdTune } from 'react-icons/md'
import { useLocation, useNavigate } from 'react-router-dom'
import { IconContext } from 'react-icons/lib'
import { Alert, Button } from 'react-bootstrap'

export default function Header({ searchedParam, companiesCount }) {
  const location = useLocation()
  const isFilterNeeded = location.pathname.includes('occupation')

  const link = window.location.href
  const url = new URL(link)
  const navigate = useNavigate()
  // const [searchParamOccupation] = useState(url.searchParams.get('occupation'))
  // const filterPath = `/filter/filter=${searchParamOccupation}`

  return (
    <Alert>
      <span style={{ display: 'flex', justifyContent: 'space-between' }}>
        <span>
          По запросу <b>"{searchedParam}"</b> найдено результатов: <b>{companiesCount}</b>{' '}
        </span>
        {isFilterNeeded && (
          <Button onClick={() => navigate(-1)}>
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
