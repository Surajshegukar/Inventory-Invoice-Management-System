import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts,removeProduct,updateProduct } from '../features/product/productReducer';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';


function ShowProduct() {
    const dispatch = useDispatch();
    const {products, loading} = useSelector(state => state.product);
    const [isModelOpen, setIsModelOpen] = useState(false);

    const [cookies,setCookies] = useCookies();
    const navigate = useNavigate();
    const [editProduct, setEditProduct] = useState({})
    
    
    
    useEffect(() => {
        if(!cookies.token){
            alert("Login please")
            navigate('/signin')
          }
        dispatch(fetchProducts());

        
    }
    , []);
    const handleEditChange = (e)=>{
        setEditProduct({...editProduct,[e.target.name]:e.target.value})
        
    }

    const handleEditClick = (e) => {
        e.preventDefault();
        if(!editProduct.name || !editProduct.category || !editProduct.price || !editProduct.hsnCode || !editProduct.shippingCharges || !editProduct.cgst || !editProduct.sgst){
            alert("Please fill all the fields");
            return;
        }
        if(editProduct.price<=0 || editProduct.cgst<0 || editProduct.sgst<0 || editProduct.shippingCharges<0){
            alert("Please enter valid values");
            return;
        }
        
        dispatch(updateProduct(editProduct));
        setTimeout(() => {
            dispatch(fetchProducts());
        }, 100);
        setIsModelOpen(false);
    }
    
    
    const handleDelete = (e,id) => {
        e.preventDefault();
        dispatch(removeProduct(id));
        setTimeout(() => {
            dispatch(fetchProducts());
        }, 100);
        
        
    }

    const handleEdit = (invoice)=>{
        setEditProduct(invoice);
        setIsModelOpen(true);

        
    }

  return (
    <div>

    <div className="relative my-5 md:overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full container text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" className="px-6 py-3">
                        Product name
                    </th>
                    <th scope="col" className="px-6 py-3">
                        HSN Code
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
                    products.map((product, index)=>{
                        return(
                            <tr key={index} className="odd:bg-white even:bg-gray-50 even:bg-gray-100 border-b">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {product.name}
                                </th>
                                <td className="px-6 py-4">
                                    {product.code}
                                </td>
                                <td className="px-6 py-4">
                                    {product.category}
                                </td>
                                <td className="px-6 py-4">
                                    ${product.price}
                                </td>
                                <td className="px-6 py-4">
                                    <button onClick={()=>handleEdit(product)} className="font-medium mx-2 text-blue-600 hover:underline">Edit</button>
                                    <button onClick={(e)=>{handleDelete(e,product._id)}} className="font-medium mx-2 text-red-600 hover:underline">Delete</button>
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
                    Edit Product
                </h3>
                <button onClick={()=>{setIsModelOpen(false)}} type="button" className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center " data-modal-toggle="crud-modal">
                    <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                        <path stroke="currentColor" strokeLinecap="round"  strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
                    </svg>
                    <span className="sr-only">Close modal</span>
                </button>
            </div>
            <form className="p-4 md:p-5" onSubmit={handleEditClick}>
                <div className='grid grid-cols-2 gap-4 mb-4 '>
                    <div className="col-span-2">
                        <label for="name" className="block mb-2 text-sm font-medium text-gray-900">Name</label>
                        <input value={editProduct.name} onChange={(e)=>handleEditChange(e)} type="text" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Type product name" required=""/>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <label for="price" className="block mb-2 text-sm font-medium text-gray-900">Price</label>
                        <input value={editProduct.price} onChange={(e)=>handleEditChange(e)}  type="number" name="price" id="price" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="$2999" required=""/>
                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <label for="category" className="block mb-2 text-sm font-medium text-gray-900">Category</label>
                        <input value={editProduct.category} onChange={(e)=>handleEditChange(e)} type="text" name="category" id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Type product category" required=""/> 

                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <label for="code" className="block mb-2 text-sm font-medium text-gray-900">Product / HSN Code</label>
                        <input value={editProduct.code} onChange={(e)=>handleEditChange(e)} type="text" name="code" id="code" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Type product / HSN code" required=""/>

                    </div>
                    <div className="col-span-2 sm:col-span-1">
                        <label for = 'shippingCharges' className="block mb-2 text-sm font-medium text-gray-900">Shipping Charges</label>
                        <input value={editProduct.shippingCharges} onChange={(e)=>handleEditChange(e)} type="number" name="shippingCharges" id="shippingCharges" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Type shipping charges" required=""/>
                    </div>
                    <div className='col-span-2 sm:col-span-1'>
                        <label for = 'cgst' className="block mb-2 text-sm font-medium text-gray-900">CGST</label>
                        <input value={editProduct.cgst} onChange={(e)=>handleEditChange(e)} type="number" name="cgst" id="cgst" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Type CGST" required=""/>

                    </div>
                    <div className='col-span-2 sm:col-span-1'>
                        <label for = 'sgst' className="block mb-2 text-sm font-medium text-gray-900">SGST</label>
                        <input value={editProduct.sgst} onChange={(e)=>handleEditChange(e)} type="number" name="sgst" id="sgst" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="Type SGST" required=""/>
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

export default ShowProduct