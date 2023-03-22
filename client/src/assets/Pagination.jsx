import React from 'react'
import { Pagination } from 'react-bootstrap'

export default function PaginationO({pagesCount, paginate, currentPage}) {
  let active = currentPage
  let items = []
  for (let number = 1; number <= pagesCount; number++) {
    items.push(
      <Pagination.Item key={number} active={number === active} onClick={()=>paginate(number)}>
        {number}
      </Pagination.Item>
    )
  }
  return (
      <Pagination>{items}</Pagination>
  )
}
