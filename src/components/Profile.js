import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import {getUser,updateUser} from '../features/auth/authReducer'
import {useNavigate} from 'react-router-dom'

function Profile() {
  const dispatch = useDispatch();
  const [cookies, setCookie] = useCookies(); // initializing state cookies with key ['token'
  const navigate = useNavigate();
  const [isModelOpen,setIsModelOpen] = useState(false)

  const user = useSelector(state => state.auth.user);
  const [editUser, setEditUser] = useState({})
  useEffect(() => {
    if(!cookies.token){
      alert("Login please")
      navigate('/signin')
    }
    dispatch(getUser(cookies.token));
  }, []);

  const handleEditUser = (e)=>{
    setEditUser(user);
    setIsModelOpen(true);
  }

  const handleEditChange = (e)=>{
    setEditUser({...editUser,[e.target.name]:e.target.value})
  }

  const handleUpdateUser = (e)=>{
    e.preventDefault();
    dispatch(updateUser(editUser));
    setTimeout(() => {
      dispatch(getUser(cookies.token));
    }, 100);
    setIsModelOpen(false);
  }

  return (
    
<div className="flex items-center h-screen w-full justify-center">

<div className="max-w-md">
    <div className="bg-white shadow-xl rounded-lg py-3">
        <div className="photo-wrapper p-2">
            <img className="w-32 h-32 rounded-full mx-auto" src="data:image/jpeg;base64,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" alt="John Doe"/>
        </div>
        <div className="p-2">
            <h3 className="text-center text-xl text-gray-900 font-medium leading-8">{user.name}</h3>
            <table className="text-xs my-3">
                <tbody>
                <tr>
                    <td className="px-2 py-2 text-gray-500 font-semibold">Phone</td>
                    <td className="px-2 py-2">+91 {user.mobile}</td>
                </tr>
                <tr>
                    <td className="px-2 py-2 text-gray-500 font-semibold">Email</td>
                    <td className="px-2 py-2">{user.email}</td>
                </tr>
            </tbody></table>

            <div className="text-center my-3">
                <a onClick={(e)=>handleEditUser(e)} className="text-xs text-indigo-500 italic hover:underline hover:text-indigo-600 font-medium" href="#">Edit Profile</a>
            </div>

        </div>
    </div>
</div>
{isModelOpen && 
    
    <div id="crud-modal" tabindex="-1" aria-hidden="true" className={`${isModelOpen?"" :"hidden"} overflow-y-auto overflow-x-hidden fixed  z-50 justify-center items-center md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
    <div className="container relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900">
                    Edit Profile
                </h3>
                <button onClick={()=>{setIsModelOpen(false)}} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center " data-modal-toggle="crud-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round"  strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            <form className="p-4 md:p-5" onSubmit={(e)=>handleUpdateUser(e)}>
                <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2">
                        <label for="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                        <input value={editUser.name} onChange={(e)=>handleEditChange(e)} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Type product name" required=""/>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <label for="mobile" className="block mb-2 text-sm font-medium text-gray-900">Mobile No.</label>
                        <input value={editUser.mobile} onChange={(e)=>handleEditChange(e)}  type="number" name="mobile" id="mobile" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="$2999" required=""/>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <label for="email" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                        <input value={editUser.email} onChange={(e)=>handleEditChange(e)} type="text" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Type product category" required=""/> 

                    </div>
                    
                </div>
                <button type="submit" className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                    <svg className="me-1 -ms-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z" clip-rule="evenodd"></path></svg>
                    Submit
                </button>
            </form>
        </div>
    </div>
</div> 
}

</div>
  )
}

export default Profile