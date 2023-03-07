import React from 'react'

export default function CompaniesList({ companies }) {
  console.log(companies[0]);

  if (companies.length)
    return (
      <div style={{ padding: '50px' }} >{companies.map(el => (
        <div> <span> {el.data[1].value} </span> &nbsp; <span style={{ color: 'green' }} > ИНН: {el.data[6].value} </span> </div>
      ))}</div>
    )
}
