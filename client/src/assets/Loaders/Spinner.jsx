import Spinner from 'react-bootstrap/Spinner'
import s from './style/SpinnerComponent.module.scss'

function SpinnerComponent() {
  return (
    <div className={s.spinner_container}>
      <Spinner animation='grow' />
    </div>
  )
}

export default SpinnerComponent
