import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Home from './components/appEntry/Home'
import { BrowserRouter } from 'react-router-dom'
// import Home from './components/appEntry/Home'

function App() {
  return (
    <div className='app'>
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    </div>
  )
}

export default App
