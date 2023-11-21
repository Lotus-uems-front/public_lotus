import React, { useState, useEffect } from 'react'
import CloseIcon from '@mui/icons-material/Close'
import s from './styles/ModalWindow.module.scss'
import SpinnerComponent from '../Loaders/Spinner'

export const ModalWindow = ({ isOpen, onClose, children }) => {
  const [spinnerOn, setSpinnerOn] = useState(false)
  const [content, setContent] = useState(null)

  useEffect(() => {
    if (isOpen) {
      setSpinnerOn(true)
      setContent(null)

      const timer = setTimeout(() => {
        setSpinnerOn(false)
        setContent(children) 
      }, 1000)

      return () => clearTimeout(timer)
    }
  }, [isOpen, children])
  if (!isOpen) return null
  return (


<div className={s.modalOverlay}>
<div className={s.modal}>
  <div className={s.modal_header}>
    <button onClick={onClose} className={s.closeButton}>
      <CloseIcon color='action' />
    </button>
    <h4>Анкета компании</h4> 
  </div>

  <div className={s.modal_content}>
    {spinnerOn ? <SpinnerComponent /> : content}
  </div>
</div>
</div> 
  )
}


{/* <div className={s.modalOverlay}>
<div className={`${s.modal} ${spinnerOn ? s.spinner_container : ''}`}>
  <div className={s.modal_header}>
    <button onClick={onClose} className={s.closeButton}>
      <CloseIcon color='action' />
    </button>
    <h4>Анкета компании</h4> 
  </div>

{spinnerOn ? <SpinnerComponent /> : content}


</div>
</div> */}