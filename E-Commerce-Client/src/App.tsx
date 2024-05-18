import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import DefaultLayout from './Components/Layouts/DefaultLayout'
import HomePage from './Pages/HomePage/'
import ShopPage from './Pages/ShopPage'
import ContactPage from './Pages/ContactPage'
import LoginPage from './Pages/LoginPage'
import CartPage from './Pages/CartPage'
import WishListPage from './Pages/WishlistPage'
import BlogPage from './Pages/BlogPage'
import AboutPage from './Pages/AboutPage'

function App() {

  return (
    <>
       <BrowserRouter>
        <Routes>
          <Route path='/' element={<DefaultLayout />}>
              <Route index element={<HomePage />} />
              <Route path="Shop" element={<ShopPage />} />
              <Route path="Contact" element={<ContactPage />} />
              <Route path="Cart" element={<CartPage />} />
              <Route path="Blog" element={<BlogPage />} />
              <Route path="WishList" element={<WishListPage />} />
              <Route path="About" element={<AboutPage />} />
              <Route path="Login" element={<LoginPage />} />
          </Route>
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
