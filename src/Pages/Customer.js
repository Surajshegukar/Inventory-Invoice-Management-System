import React, { useEffect, useState } from 'react'
import ShowCustomer from './ShowCustomer';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import { addCustomer } from '../features/customer/customerReducer';
import {useNavigate} from 'react-router-dom'

function Customer() {
    const [cookies,setCookies] = useCookies();
    const navigate = useNavigate();

    useEffect(() => {
        if(!cookies.token){
          alert("Login please")
          navigate('/signin')
        }
    },[])
    
    const [customer, setCustomer] = useState({});
    const dispatch = useDispatch();
    const handleOnClick =(e)=>{
        e.preventDefault();
        if(!customer.customerName || !customer.customerAddress || !customer.customerMobile || !customer.customerEmail){
            alert("Please fill all the fields");
            return;
        }
        if(customer.customerMobile.length !== 10){
            alert("Mobile no. should be of 10 digits");
            return;
        }
        if(!customer.customerEmail.includes('@')){
            alert("Email is not valid");
            return;
        }
        
        dispatch(addCustomer(customer));
        setCustomer({
            customerName: "",
            customerAddress: "",
            customerMobile: 0,
            customerEmail: ""
        });
        
    }

    
    const handleOnChange = (e)=>{
        setCustomer({...customer, [e.target.name]: e.target.value});
    }
    
  return (
    <div className='container'>
            <div className='container my-5 font-bold font-serif'>Add Customer</div>
            <div className='container flex gap-5 flex-wrap my-5'>
                <div className="form-floating mx-2 " style={{ minWidth: "400px" }}>
                    <input
                        type="text"
                        name="customerName"
                        value={customer.customerName}
                        className="form-control"
                        onChange={handleOnChange}
                        id="floatingInput"
                        placeholder="Customer Name"
                    />
                    <label htmlFor="floatingInput">Customer Name</label>
                </div>
                <div className="form-floating mx-2" style={{ minWidth: "400px" }}>
                    <input
                        type="text"
                        name="customerAddress"
                        value={customer.customerAddress}
                        onChange={handleOnChange}
                        className="form-control"
                        id="floatingInput"
                        placeholder="Customer Name"
                    />
                    <label htmlFor="floatingInput">Customer Address</label>
                </div>
                <div className="form-floating mx-2 " style={{ minWidth: "400px" }}>
                    <input
                        type="number"
                        name="customerMobile"
                        value={customer.customerMobile}
                        onChange={handleOnChange}
                        className="form-control"
                        id="floatingInput"
                        placeholder="Customer Name"
                    />
                    <label htmlFor="floatingInput">Customer Mobile No.</label>
                </div>
                <div className="form-floating mx-2 " style={{ minWidth: "400px" }}>
                    <input
                        type="email"
                        name="customerEmail"
                        value={customer.customerEmail}
                        onChange={handleOnChange}
                        className="form-control"
                        id="floatingInput"
                        placeholder="Customer Name"
                    />
                    <label htmlFor="floatingInput">Customer Email</label>

                </div>
                <div className='form-floating mx-2 my-2' >
                    <button  onClick={handleOnClick} className='btn btn-primary'>
                        Add Customer
                    </button>
                </div>

            </div>
            <ShowCustomer/>
            

        </div>
  )
}

export default Customer