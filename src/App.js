
import './App.css';
import Banner from './Pages/Banner';
import Navbar from './components/Navbar';
import NotFound from './components/NotFound';
import SideMenu from './components/SideMenu';
import Signin from './components/Signin';
import Signup from './components/Signup';
import {useEffect, useState} from 'react'

import {
  BrowserRouter as Router,
  Route,
  Routes,
  Link
  } from "react-router-dom"

import Customer from './Pages/Customer';
import InvoicePage from './Pages/InvoicePage';
import ShowInvoices from './Pages/ShowInvoices';
import Service from './Pages/Service';
import Profile from './components/Profile'
import { useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import Seller from './Pages/Seller';
import Product from './Pages/Products'
import Dashboard from './Pages/Dashboard';


function App() {

  const [cookie,setCookie] = useCookies();
  const [isLogin, setIsLogin] = useState(true);

  useEffect(() => {
    // console.log(cookie.token);
    cookie.token ? setIsLogin(true) : setIsLogin(false);

  }, [cookie.token])
  

  return (
    <div className= {isLogin ? "flex ":""} >
    <Router> 
          {isLogin ? <SideMenu/> : <Navbar/>}
          
          <Routes>
              <Route path = "/" element = {<Banner/>} />
              <Route path = "/signup" element = {<Signup/>} />
              <Route path='/signin' element = {<Signin/>}/>
              <Route path = "/*" element = {<NotFound/>}/>
              <Route path = '/product' element = {<Product />}/>
              <Route path = '/service' element = {<Service/>}/>
              <Route path = '/customer' element = {<Customer/>}/>
              <Route path = '/invoice' element = {<InvoicePage/>}/>
              <Route path = '/showinvoices' element = {<ShowInvoices/>}/>
              <Route path = '/profile' element = {<Profile/>}/>
              <Route path = '/seller' element = {<Seller />}/>
              <Route path = '/dashboard' element = {<Dashboard/>} />
          </Routes>
        
      </Router>
      </div>
  );
}

export default App;
