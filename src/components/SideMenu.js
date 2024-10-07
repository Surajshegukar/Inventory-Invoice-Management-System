import React, { useEffect,useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from 'react-router-dom'
import { useCookies } from 'react-cookie'
import { getUser } from '../features/auth/authReducer';


function SideMenu() {
  const dispatch = useDispatch();
  const [cookies,setCookie,removeCookie] = useCookies();
  const navigate = useNavigate();
  const {user,loading} = useSelector(state => state.auth);
  const [userName, setUserName] = useState('')
  useEffect(() => {
    if(user){
      setUserName(user.name)
    }
  }, [user])
  
  

  const handleLogout = () => {
    removeCookie('token')
    alert('Logged out successfully')

  }

  useEffect(() => {
    if(!cookies.token){
      navigate('/signin')
    }
    if(cookies.token){
      dispatch(getUser(cookies.token));
    }
    
  }, [cookies.token])
  
  
  return (
    <div className="min-h-screen p-3 space-y-2 w-60 dark:bg-gray-50 dark:text-gray-800">
      <div className="flex items-center p-2 space-x-4">
        <img src="https://source.unsplash.com/100x100/?portrait" alt="" className="w-12 h-12 rounded-full dark:bg-gray-500" />
        <div>
          <h2 className="text-lg font-semibold">{userName}</h2>
          <span className="flex items-center space-x-1">
            <Link rel="noopener noreferrer" to={'/profile'} className="text-xs hover:underline dark:text-gray-600">View profile</Link>
          </span>
        </div>
      </div>
      <div className="divide-y dark:divide-gray-300">
        <ul className="pt-2 pb-4 space-y-1 text-sm">
          <li className="dark:bg-gray-100 dark:text-gray-900">
            <Link rel="noopener noreferrer" to={'/dashboard'} className="flex items-center p-2 space-x-3 rounded-md">
            <svg class="h-5 w-5 text-cyan-500"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <line x1="4" y1="6" x2="20" y2="6" />  <line x1="4" y1="12" x2="20" y2="12" />  <line x1="4" y1="18" x2="20" y2="18" /></svg>
              <span>Dashboard</span>
            </Link>
          </li>
          <li>
            <Link rel="noopener noreferrer" to={'/seller'} className="flex items-center p-2 space-x-3 rounded-md">
            <svg class="h-5 w-5 text-cyan-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />  <circle cx="12" cy="7" r="4" /></svg>
              <span>Seller</span>
            </Link>
          </li>
          <li>
            <Link rel="noopener noreferrer" to={'/customer'} className="flex items-center p-2 space-x-3 rounded-md">
            <svg class="h-5 w-5 text-cyan-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"/>
</svg>

              <span>Customer</span>
            </Link>
          </li>
          
          <li>
            <Link rel="noopener noreferrer" to={'/product'} className="flex items-center p-2 space-x-3 rounded-md">
            <svg class="h-5 w-5 text-cyan-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"/>
</svg>

              <span>Products</span>
            </Link>
          </li>
          <li>
            <Link rel="noopener noreferrer" to={'/service'} className="flex items-center p-2 space-x-3 rounded-md">
            <svg class="h-5 w-5 text-cyan-500"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M7 10h3v-3l-3.5 -3.5a6 6 0 0 1 8 8l6 6a2 2 0 0 1 -3 3l-6-6a6 6 0 0 1 -8 -8l3.5 3.5" /></svg>
              <span>Service</span>
            </Link>
          </li>
          <li>
            <Link rel="noopener noreferrer" to={"/invoice"} className="flex items-center p-2 space-x-3 rounded-md">
            <svg class="h-5 w-5 text-cyan-500"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M14 3v4a1 1 0 0 0 1 1h4" />  <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />  <line x1="9" y1="7" x2="10" y2="7" />  <line x1="9" y1="13" x2="15" y2="13" />  <line x1="13" y1="17" x2="15" y2="17" /></svg>
              <span>Add Invoice</span>
            </Link>
          </li>
          <li>
            <Link rel="noopener noreferrer" to={'/showinvoices'} className="flex items-center p-2 space-x-3 rounded-md">
            <svg class="h-5 w-5 text-cyan-500"  fill="none" viewBox="0 0 24 24" stroke="currentColor">
  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2"/>
</svg>

              <span>Show Invoices</span>
            </Link>
          </li>
          
        </ul>
        <ul className="pt-4 pb-2 space-y-1 text-sm">
          <li>
            <a rel="noopener noreferrer" href="#" className="flex items-center p-2 space-x-3 rounded-md">
            <svg class="h-5 w-5 text-cyan-500"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round">  <circle cx="12" cy="12" r="3" />  <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" /></svg>
              <span>Settings</span>
            </a>
          </li>
          <li>
            <Link rel="noopener noreferrer" onClick={handleLogout} className="flex items-center p-2 space-x-3 rounded-md">
            <svg class="h-5 w-5 text-cyan-500"  width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">  <path stroke="none" d="M0 0h24v24H0z"/>  <path d="M14 8v-2a2 2 0 0 0 -2 -2h-7a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7a2 2 0 0 0 2 -2v-2" />  <path d="M7 12h14l-3 -3m0 6l3 -3" /></svg>
              <span>Logout</span>
              
            </Link>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default SideMenu