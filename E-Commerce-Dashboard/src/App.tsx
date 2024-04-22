import {BrowserRouter, Routes, Route} from 'react-router-dom'
import './App.css'
import DefaultLayout from './Components/Layouts/DefaultLayout';
import Dashboard from './Pages/DashboardPage';
import Category from './Pages/CategoryPage';
import Brand from './Pages/BrandPage';
import Employee from './Pages/EmployeePage';
import Customer from './Pages/CustomerPage';
import Product from './Pages/ProductPage';
import Order from './Pages/OrderPage';
import Login from './Pages/LoginPage';
import NoPage from './Pages/NoPage';

function App() {

    return (
      <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<DefaultLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="Categories" element={<Category />} />
              <Route path="Customers" element={<Customer />} />
              <Route path="Employees" element={<Employee />} />
              <Route path="Orders" element={<Order />} />
              <Route path="Brands" element={<Brand />} />
              <Route path="Products" element={<Product />} />
          </Route>
          <Route path="/Login" element={<Login />} />
          <Route path="*" element={<NoPage />} />
          </Routes>
      </BrowserRouter>
      </>
    )
  }
  
  export default App