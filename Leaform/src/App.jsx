import { useState } from 'react'
import Header from './components/header'
import Details from './Pages/details'
import Interest from './Pages/intersts'
import MultiStepForm from './Pages/MultiStepForm'
import Contact from './Pages/contact'
import './App.css'
import { BrowserRouter, Routes, Route, Link ,Navigate} from 'react-router-dom';
import Home from './Pages/home'

function App() {


  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path="/form/*" element={<MultiStepForm />} />
      <Route path="/" element={<Navigate to="/form/details" replace />} />
      <Route path='/cnt' element={<Contact/>}/>
    </Routes>
    
    
    </BrowserRouter>
  )
}

export default App
