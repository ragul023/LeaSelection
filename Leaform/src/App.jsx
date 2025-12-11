
import MultiStepForm from './Pages/MultiStepForm'
import Contact from './Pages/contact'
import './App.css'
import { BrowserRouter, Routes, Route, Link ,Navigate} from 'react-router-dom';
import Home from './Pages/home'
import Display from './Pages/display';

function App() {


  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path="/form/*" element={<MultiStepForm />} />
      <Route path='/cnt' element={<Contact/>}/>
      <Route path='/display'element={<Display/>}/>
    </Routes>
    
    
    </BrowserRouter>
  )
}

export default App
