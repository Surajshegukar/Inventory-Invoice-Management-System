import React from 'react'
import { fetchSellers,removeSeller,updateSeller,addSeller } from '../features/seller/sellerReducer'
import { useDispatch, useSelector } from 'react-redux'
import { useEffect,useState } from 'react'
import { useCookies } from 'react-cookie'
import { useNavigate } from 'react-router-dom'
import ShowSeller from './ShowSeller'

function Seller() {
    const [cookies,setCookies] = useCookies();
    const navigate = useNavigate();

    useEffect(() => {
        if(!cookies.token){
          alert("Login please")
          navigate('/signin')
        }
    },[])
    
    const [seller, setSeller] = useState({});
    const dispatch = useDispatch();
    const handleOnClick =(e)=>{

        e.preventDefault();
        if(!seller.name || !seller.address || !seller.mobile || !seller.email || !seller.panNo || !seller.gstNo){
            alert("Please fill all the fields");
            return;
        }
        if(seller.mobile.length !== 10){
            alert("Mobile no. should be of 10 digits");
            return;
        }
        if(!seller.email.includes('@')){
            alert("Email is not valid");
            return;
        }
        dispatch(addSeller(seller));
        setSeller({
            name: "",
            address: "",
            mobile: "",
            email: "",
            panNo: "",
            gstNo: ""
        });
        
    }

    
    const handleOnChange = (e)=>{
        setSeller({...seller, [e.target.name]: e.target.value});
    }
    
  return (
    <div className='container mx-4'>
            <div className='container my-5 font-bold font-serif'>Add Seller</div>
            <div className='container flex gap-5 flex-wrap my-5'>
                <div className="form-floating mx-2 " style={{ minWidth: "400px" }}>
                    <input
                        type="text"
                        name="name"
                        value={seller.name}
                        className="form-control"
                        onChange={handleOnChange}
                        id="floatingInput"
                        placeholder="Seller Name"
                    />
                    <label htmlFor="floatingInput">Seller Name</label>
                </div>
                <div className="form-floating mx-2" style={{ minWidth: "400px" }}>
                    <input
                        type="text"
                        name="address"
                        value={seller.address}
                        onChange={handleOnChange}
                        className="form-control"
                        id="floatingInput"
                        placeholder="Seller Address"
                    />
                    <label htmlFor="floatingInput">Seller Address</label>
                </div>
                <div className="form-floating mx-2 " style={{ minWidth: "400px" }}>
                    <input
                        type="number"
                        name="mobile"
                        value={seller.mobile}
                        onChange={handleOnChange}
                        className="form-control"
                        id="floatingInput"
                        placeholder="Seller Mobile"
                    />
                    <label htmlFor="floatingInput">Seller Mobile No.</label>
                </div>
                <div className="form-floating mx-2 " style={{ minWidth: "400px" }}>
                    <input
                        type="email"
                        name="email"
                        value={seller.email}
                        onChange={handleOnChange}
                        className="form-control"
                        id="floatingInput"
                        placeholder="Seller Email"
                    />
                    <label htmlFor="floatingInput">Seller Email</label>

                </div>

                <div className="form-floating mx-2 " style={{ minWidth: "400px" }}>
                    <input
                        type="text"
                        name="panNo"
                        value={seller.panNo}
                        onChange={handleOnChange}
                        className="form-control"
                        id="floatingInput"
                        placeholder="Seller Pan No."
                    />
                    <label htmlFor="floatingInput">Seller Pan No.</label>
                </div>
                <div className="form-floating mx-2 " style={{ minWidth: "400px" }}>
                    <input
                        type="text"
                        name="gstNo"
                        value={seller.gstNo}
                        onChange={handleOnChange}
                        className="form-control"
                        id="floatingInput"
                        placeholder="Seller Gst No."
                    />
                    <label htmlFor="floatingInput">Seller Gst No.</label>
                </div>

                <div className='form-floating mx-2 my-2' >
                    <button  onClick={handleOnClick} className='btn btn-primary'>
                        Add Selller
                    </button>
                </div>

            </div>
            <ShowSeller/>
            

        </div>
  )
}


export default Seller