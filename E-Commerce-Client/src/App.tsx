import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import DefaultLayout from './Components/Layouts/DefaultLayout'
import HomePage from './Pages/HomePage/'
import LoginPage from './Pages/LoginPage'
function App() {

  return (
    <>
       <BrowserRouter>
        <Routes>
          <Route path='/' element={<DefaultLayout />}>
              <Route index element={<HomePage />} />
              <Route path="Login" element={<LoginPage />} />
          </Route>
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
