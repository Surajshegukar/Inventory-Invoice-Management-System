import React from 'react'
import { useSelector } from 'react-redux';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';
import { fetchProducts } from '../features/product/productReducer';
import { useDispatch } from 'react-redux';
import { useEffect,useState } from 'react';
import { fetchCustomers } from '../features/customer/customerReducer';
import { fetchInvoices } from '../features/invoice/invoiceReducer';


function Dashboard() {
    const [cookies] = useCookies();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {products,loading} = useSelector(state => state.product);
    const {customers} = useSelector(state => state.customer);
    const {invoices} = useSelector(state => state.invoice);
    const [totalProducts, setTotalProducts] = useState(0);
    const [totalCustomers, setTotalCustomers] = useState(0);
    const [totalInvoices, setTotalInvoices] = useState(0);
    
    const [totalCategories, setTotalCategories] = useState(0);
    
    

    useEffect(() => {
        
        if(!cookies.token){
            alert("Please Login")          
            navigate('/signin')
            return;
          }
        dispatch(fetchProducts());
        dispatch(fetchCustomers());
        dispatch(fetchInvoices());
        calculate();
    },[]);
    
        
    

    const productList = useSelector(state => state.product.products);
    const customerList = useSelector(state => state.customer.customers);
    const invoiceList = useSelector(state => state.invoice.invoices);

    const calculate = () => {
        setTotalProducts(products.length);
        setTotalCustomers(customers.length);
        setTotalInvoices(invoices.length);
        setTotalCategories(productList.map((product) => product.category).length);
    }
        
        

    
  return (
    <div>
        <h1 className='container my-5 mx-3 font-bold font-serif'>Dashboard</h1>
        <div className="container p-3 my-5">
            <div className="row gap-0">
                <div className="col-md-4 mb-3">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Total Products</h5>
                            <p className="card-text">{totalProducts}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Total Invoices</h5>
                            <p className="card-text">{totalInvoices}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Total Customers</h5>
                            <p className="card-text">{totalCustomers}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Total Users</h5>
                            <p className="card-text">1</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Total Categories</h5>
                            <p className="card-text">{totalCategories}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Total Orders</h5>
                            <p className="card-text"></p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Total Sales</h5>
                            <p className="card-text"></p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Total Revenue</h5>
                            <p className="card-text"></p>
                        </div>
                    </div>
                
                </div>
                <div className="col-md-4 mb-3">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Total Expenses</h5>
                            <p className="card-text"></p>
                        </div>
                    </div>
                </div>
            </div>
            </div>


    </div>
  )
}

export default Dashboard