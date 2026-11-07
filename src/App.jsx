import { Route, Routes } from 'react-router-dom'
import './App.css'
import Header from './components/Header'
import MainPage from './pages/MainPage'

function App() {
  

  return (
    <>
     <Header/>
     <Routes>
      <Route path='/' element={<MainPage/>}/>
     </Routes>
    </>
  )
}

export default App
