import React from 'react'

export default function CompaniesList({companies}) {
  console.log(companies[0]);
 
  if(companies.length)
  return (
    <div>{companies.map(el => (
      <div>{el.data[1].value}</div>
    ))}</div>
  )
}
