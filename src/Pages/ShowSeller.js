import React from 'react'
import { fetchSellers,removeSeller,updateSeller } from '../features/seller/sellerReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect,useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'



function ShowSeller() {
  
        const dispatch = useDispatch();
        const {sellers, loading} = useSelector(state => state.seller);
        const [editSeller, setEditSeller] = useState({})
        const [isModelOpen, setIsModelOpen] = useState(false);
    
        useEffect(() => {
            dispatch(fetchSellers());
        }, []);
    
    
        const handleDelete = (e,id) => {
            e.preventDefault();
            dispatch(removeSeller(id));
            setTimeout(() => {
                dispatch(fetchSellers());
            }, 100);
        }
        const handleEdit = (item)=>{
            setEditSeller(item);
            console.log(item);
            setIsModelOpen(true);
    
        }
        const handleEditChange = (e)=>{
            setEditSeller({...editSeller,[e.target.name]:e.target.value})
        }
    
        const handleUpdateSeller = (e)=>{
            e.preventDefault();
            if(!editSeller.name || !editSeller.address || !editSeller.email || !editSeller.mobile || !editSeller.panNo || !editSeller.gstNo){
                alert("Please fill all the fields");
                return;
            }
            if(editSeller.mobile.length !== 10){
                alert("Mobile no. should be of 10 digits");
                return;
            }
            if(!editSeller.email.includes('@')){
                alert("Email is not valid");
                return;
            }

            dispatch(updateSeller(editSeller));
            setTimeout(() => {
                dispatch(fetchSellers());
            }, 100);
            setIsModelOpen(false);
        }
    
      return (
        <div>
    
        <div className="relative my-5 md:overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full container text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                    <tr>
                        <th scope="col" className="px-6 py-3">
                            Seller Name
                        </th>
                        
                        <th scope="col" className="px-6 py-3">
                            Seller Email
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Seller Address
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Seller Mobile No.
                        </th>
                        <th scope="col" className="px-6 py-3">
                            Action
                        </th>
                    </tr>
                </thead>
                <tbody>
                {
                
                    sellers.map((seller, index)=>{
                        return(
                            <tr key={index} className="odd:bg-white even:bg-gray-50 even:bg-gray-100 border-b">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {seller.name}
                                </th>
                                <td className="px-6 py-4">
                                    {seller.email}
                                </td>
                                <td className="px-6 py-4">
                                    {seller.address}
                                </td>
                                <td className="px-6 py-4">
                                    {seller.mobile}
                                </td>
                                    
                                <td className="px-6 py-4">
                                    <button onClick={()=>handleEdit(seller)} className="font-medium mx-2 text-blue-600 hover:underline">Edit</button>
                                    <button onClick={(e)=>{handleDelete(e,seller._id)}} className="font-medium mx-2 text-red-600 hover:underline">Delete</button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
        </div>
        {isModelOpen && 
        
        <div id="crud-modal" tabindex="-1" aria-hidden="true" className={`${isModelOpen?"" :"hidden"} overflow-y-auto overflow-x-hidden fixed  z-50 justify-center items-center md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
        <div className=" container relative p-4 w-full max-w-md max-h-full">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                
                <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                    <h3 className="text-lg font-semibold text-gray-900">
                        Edit Seller
                    </h3>
                    <button onClick={()=>{setIsModelOpen(false)}} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-toggle="crud-modal">
                        <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                            <path stroke="currentColor" strokeLinecap="round"  strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                        </svg>
                        <span className="sr-only">Close modal</span>
                    </button>
                </div>
                <form onSubmit={handleUpdateSeller} className="p-4 md:p-5">
                    <div className="grid gap-4 mb-4 grid-cols-2">
                        <div className="col-span-2">
                            <label for="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                            <input value={editSeller.name} onChange={(e)=>handleEditChange(e)} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Type seller name" required=""/>
                        </div>
                        <div className="col-span-2">
                            <label for="name" className="block mb-2 text-sm font-medium text-gray-900">Address</label>
                            <input value={editSeller.address} onChange={(e)=>handleEditChange(e)} type="text" name="address" id="address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Type seller name" required=""/>
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <label for="price" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                            <input value={editSeller.email} onChange={(e)=>handleEditChange(e)} type="text" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="$2999" required=""/>
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <label for="price" className="block mb-2 text-sm font-medium text-gray-900">Mobile</label>
                            <input value={editSeller.mobile} onChange={(e)=>handleEditChange(e)} type="number" name="mobile" id="mobile" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Enter Mobile No." required=""/>
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <label for="panNo" className="block mb-2 text-sm font-medium text-gray-900">PAN Number</label>
                            <input value={editSeller.panNo} onChange={(e)=>handleEditChange(e)} type="text" name="panNo" id="panNo" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Enter PAN No" required=""/>
                        </div>
                        <div className="col-span-2 sm:col-span-1">
                            <label for="gstNo" className="block mb-2 text-sm font-medium text-gray-900">GST Number</label>
                            <input value={editSeller.gstNo} onChange={(e)=>handleEditChange(e)} type="text" name="gstNo" id="gstNo" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Enter GST No" required=""/>
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

export default ShowSeller