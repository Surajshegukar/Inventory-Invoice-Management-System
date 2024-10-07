import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchCustomers, removeCustomer,updateCustomer } from '../features/customer/customerReducer';
import { useCookies } from 'react-cookie';


function ShowCustomer() {
    const dispatch = useDispatch();
    const {customers, loading} = useSelector(state => state.customer);
    const [editCustomer, setEditCustomer] = useState({})
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [cookies, setCookie] = useCookies(['token']);
    

    useEffect(() => {
        dispatch(fetchCustomers(cookies.token));
    }, []);


    const handleDelete = (e,id) => {
        e.preventDefault();
        dispatch(removeCustomer(id,cookies.token));
        setTimeout(() => {
            dispatch(fetchCustomers(cookies.token));
        }, 100);
    }
    const handleEdit = (item)=>{
        setEditCustomer(item);
        setIsModelOpen(true);

    }
    const handleEditChange = (e)=>{
        setEditCustomer({...editCustomer,[e.target.name]:e.target.value})
    }

    const handleUpdateCustomer = (e)=>{
        e.preventDefault();
        if(!editCustomer.customerName || !editCustomer.customerAddress || !editCustomer.customerMobile || !editCustomer.customerEmail){
            alert("Please fill all the fields");
            return;
        }
        if(editCustomer.customerMobile.length !== 10){
            alert("Mobile no. should be of 10 digits");
            return;
        }
        if(!editCustomer.customerEmail.includes('@')){
            alert("Email is not valid");
            return;
        }
        dispatch(updateCustomer(editCustomer,cookies.token));
        setTimeout(() => {
            dispatch(fetchCustomers(cookies.token));
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
                        Customer Name
                    </th>
                    
                    <th scope="col" className="px-6 py-3">
                        Customer Email
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Customer Address
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Customer Mobile No.
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
            {
                    customers.map((customer, index)=>{
                        return(
                            <tr key={index} className="odd:bg-white even:bg-gray-50 even:bg-gray-100 border-b">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {customer.customerName}
                                </th>
                                <td className="px-6 py-4">
                                    {customer.customerEmail}
                                </td>
                                <td className="px-6 py-4">
                                    {customer.customerAddress}
                                </td>
                                <td className="px-6 py-4">
                                    {customer.customerMobile}
                                </td>
                                    
                                <td className="px-6 py-4">
                                    <button onClick={()=>handleEdit(customer)} className="font-medium mx-2 text-blue-600 hover:underline">Edit</button>
                                    <button onClick={(e)=>{handleDelete(e,customer._id)}} className="font-medium mx-2 text-red-600 hover:underline">Delete</button>
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
                    Edit Customer
                </h3>
                <button onClick={()=>{setIsModelOpen(false)}} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center" data-modal-toggle="crud-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            <form onSubmit={handleUpdateCustomer} className="p-4 md:p-5">
                <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2">
                        <label for="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                        <input value={editCustomer.customerName} onChange={(e)=>handleEditChange(e)} type="text" name="customerName" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Type product name" required=""/>
                    </div>
                    <div className="col-span-2">
                        <label for="name" className="block mb-2 text-sm font-medium text-gray-900">Address</label>
                        <input value={editCustomer.customerAddress} onChange={(e)=>handleEditChange(e)} type="text" name="customerAddress" id="address" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Type product name" required=""/>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <label for="price" className="block mb-2 text-sm font-medium text-gray-900">Email</label>
                        <input value={editCustomer.customerEmail} onChange={(e)=>handleEditChange(e)} type="text" name="customerEmail" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="$2999" required=""/>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <label for="price" className="block mb-2 text-sm font-medium text-gray-900">Mobile</label>
                        <input value={editCustomer.customerMobile} onChange={(e)=>handleEditChange(e)} type="number" name="customerMobile" id="mobile" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="$2999" required=""/>
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

export default ShowCustomer