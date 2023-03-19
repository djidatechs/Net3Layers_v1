
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import Application from './Pages/Application'


function App() {

  return (
    <Routes>
      <Route path='/' element={<Home/>} />
      <Route path='/application' element={<Application/>} />
    </Routes>
  )
}

export default App
