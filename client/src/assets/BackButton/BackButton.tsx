import React from 'react'
import { IoIosArrowBack } from 'react-icons/io'
import { useNavigate } from 'react-router-dom'

type Props = {
    style: string
}

export default function BackButton({style}: Props) {
    const navigate = useNavigate()
    
  return (
    <span onClick={()=>navigate(-1)} className={style}>
       <IoIosArrowBack /> 
    </span>
  )
}
