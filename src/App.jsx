import React from 'react'
import MainPage from './pages/MainPage'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import { Routes } from 'react-router-dom/dist'
import UploadWorkerInformation from './pages/UploadWorkerInformation'

function App() {
  return (
    <div>
      <Router>
        <Routes>
          <Route path='/uploadInformation' element={<UploadWorkerInformation/>}/>
          <Route path='/' element={<MainPage/>}/>
        </Routes>
      </Router>
    </div>
  )
}

export default App
