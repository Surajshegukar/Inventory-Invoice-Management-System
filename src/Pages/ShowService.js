import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { fetchServices, removeService,updateService } from '../features/service/serviceReducer';

function ShowService() {
    const dispatch = useDispatch();
    const {services, loading} = useSelector(state => state.service);
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [editService, setEditService] = useState({})
    
    useEffect(() => {
        dispatch(fetchServices());
        
    }
    , []);

    const handleEditChange = (e)=>{
        setEditService({...editService,[e.target.name]:e.target.value})
    }

    const handleUpdateService = (e)=>{
        e.preventDefault();
        if(!editService.name || !editService.price || !editService.category || !editService.serviceCode || !editService.cgst || !editService.sgst){
            alert("Please fill all the fields");
            return;
        }
        if(editService.price<=0 || editService.cgst<0 || editService.sgst<0){
            alert("Please enter valid values");
            return;
        }
        
        dispatch(updateService(editService));
        setTimeout(() => {
            dispatch(fetchServices());
        }, 100);
        setIsModelOpen(false);
    }
    
    
    const handleDelete = (e,id) => {
        e.preventDefault();
        dispatch(removeService(id));
        setTimeout(() => {
            dispatch(fetchServices());
        }, 100);
        
        
    }

    const handleEdit = (item)=>{
        setEditService(item);
        setIsModelOpen(true);
    }
  return (


    <div>

    <div className="relative my-5 md:overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full container text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Service Name
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Service Code
                    </th>
                    
                    <th scope="col" className="px-6 py-3">
                        Category
                    </th>
                    <th scope="col" className="px-6 py-3">
                        Price
                    </th>
                    
                    <th scope="col" className="px-6 py-3">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
            {
                    services.map((service, index)=>{
                        return(
                            <tr key={index} className="odd:bg-white even:bg-gray-50 even:bg-gray-100 border-b">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {service.name}
                                </th>
                                <td className="px-6 py-4">
                                    {service.code}
                                </td>
                                <td className="px-6 py-4">
                                    {service.category}
                                </td>
                                <td className="px-6 py-4">
                                    ${service.price}
                                </td>
                                <td className="px-6 py-4">
                                    <button onClick={()=>handleEdit(service)} className="font-medium mx-2 text-blue-600 hover:underline">Edit</button>
                                    <button onClick={(e)=>{handleDelete(e,service._id)}} className="font-medium mx-2 text-red-600 hover:underline">Delete</button>
                                </td>
                            </tr>
                        )
                    })}
            </tbody>
        </table>
    </div>
    {isModelOpen && 
    
    <div id="crud-modal" tabindex="-1" aria-hidden="true" className={`${isModelOpen?"" :"hidden"} overflow-y-auto overflow-x-hidden fixed  z-50 justify-center items-center md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
    <div className="container relative p-4 w-full max-w-md max-h-full">
        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                <h3 className="text-lg font-semibold text-gray-900">
                    Edit Service
                </h3>
                <button onClick={()=>{setIsModelOpen(false)}} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center " data-modal-toggle="crud-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round"  strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            <form onSubmit={(e)=>handleUpdateService(e)} className="p-4 md:p-5">
                <div className="grid gap-4 mb-4 grid-cols-2">
                    <div className="col-span-2">
                        <label for="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                        <input value={editService.name} onChange={(e)=>handleEditChange(e)} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Type service name" required=""/>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <label for="price" className="block mb-2 text-sm font-medium text-gray-900">Price</label>
                        <input value={editService.price} type="number" onChange={(e)=>handleEditChange(e)}  name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="$2999" required=""/>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <label for="category" className="block mb-2 text-sm font-medium text-gray-900">Category</label>
                        <input value={editService.category} type="text" onChange= {(e)=>handleEditChange(e)}  name="category" id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Type service category" required=""/>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <label for="serviceCode" className="block mb-2 text-sm font-medium text-gray-900">Service Code</label>
                        <input value={editService.code} type="text" onChange= {(e)=>handleEditChange(e)}  name="code" id="serviceCode" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Type service Code" required=""/>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <label for="cgst" className="block mb-2 text-sm font-medium text-gray-900">CGST</label>
                        <input value={editService.cgst} type="number" onChange= {(e)=>handleEditChange(e)}  name="cgst" id="cgst" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Type service cgst" required=""/>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <label for="sgst" className="block mb-2 text-sm font-medium text-gray-900">SGST</label>
                        <input value={editService.sgst} type="number" onChange= {(e)=>handleEditChange(e)}  name="sgst" id="sgst" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Type product sgst" required=""/>
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

export default ShowService