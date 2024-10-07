import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux';
import { addService } from '../features/service/serviceReducer';
import ShowService from './ShowService';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';

function Service() {

    const [cookies,setCookies] = useCookies();
    const navigate = useNavigate();

    useEffect(() => {
        if(!cookies.token){
          alert("Login please")
          navigate('/signin')
        }
    },[])
    const [service, setService] = useState({
        name: "",
        category: "",
        price: 0,
        code:0,
        cgst:0,
        sgst:0
    });

    const dispatch = useDispatch();

    const handleOnChange = (e) => {
        setService({ ...service, [e.target.name]: e.target.value });

    };
    const handleOnClick = (e) => {
        e.preventDefault();
        if (!service.name || !service.category || !service.price || !service.code || !service.cgst || !service.sgst) {
            alert("Please fill all the fields");
            return;
        }
        if(service.price<=0 || service.cgst<0 || service.sgst<=0 || service.code<=0){
            alert("Please enter valid values");
            return;
        }

        
        dispatch(addService(service));
        setService({
            name: "",
            category: "",
            price: 0,
            code:0,
            cgst:0,
            sgst:0
        });


    };
  return (
    <div className='container'>
            <div className='container my-5 font-bold font-serif'>Add Service</div>
            <div className='container flex gap-5 flex-wrap my-5'>
                <div className="form-floating mx-2 " style={{ minWidth: "400px" }}>
                    <input
                        type="text"
                        name="name"
                        value={service.name}
                        className="form-control"
                        onChange={handleOnChange}
                        id="floatingInput"
                        placeholder="Service Name"
                    />
                    <label htmlFor="floatingInput">Service Name</label>
                </div>
                <div className="form-floating mx-2" style={{ minWidth: "400px" }}>
                    <input
                        type="text"
                        name="category"
                        value={service.category}
                        onChange={handleOnChange}
                        className="form-control"
                        id="floatingInput"
                        placeholder="Service Category"
                    />
                    <label htmlFor="floatingInput">Service Category</label>
                </div>
                <div className="form-floating mx-2 " style={{ minWidth: "400px" }}>
                    <input
                        type="number"
                        name="price"
                        value={service.price}
                        onChange={handleOnChange}
                        className="form-control"
                        id="floatingInput"
                        placeholder="Service Price"
                    />
                    <label htmlFor="floatingInput">Service Price</label>
                </div>
                <div className="form-floating mx-2 " style={{ minWidth: "400px" }}>
                    <input
                        type="text"
                        name="code"
                        value={service.code}
                        onChange={handleOnChange}
                        className="form-control"
                        id="floatingInput"
                        placeholder="Service Code"
                    />
                    <label htmlFor="floatingInput">Service Code</label>
                </div>
                <div className="form-floating mx-2 " style={{ minWidth: "400px" }}>
                    <input
                        type="number"
                        name="cgst"
                        value={service.cgst}
                        onChange={handleOnChange}
                        className="form-control"
                        id="floatingInput"
                        placeholder="Service CGST"
                    />
                    <label htmlFor="floatingInput">CGST Rate</label>
                </div>
                <div className="form-floating mx-2 " style={{ minWidth: "400px" }}>
                    <input
                        type="number"
                        name="sgst"
                        value={service.sgst}
                        onChange={handleOnChange}
                        className="form-control"
                        id="floatingInput"
                        placeholder="Service SGST"
                    />
                    <label htmlFor="floatingInput">SGST Rate</label>
                </div>
                
                <div className='form-floating mx-2 my-2' >
                    <button  onClick={handleOnClick} className='btn btn-primary'>
                        Add Service
                    </button>
                </div>

            </div>
            <ShowService />
            

        </div>
  )
}

export default Service