import React, { useEffect, useState } from 'react'
import ShowProduct from './ShowProduct'
import { useDispatch,useSelector } from 'react-redux'
import { addProduct,fetchProducts, removeProduct } from '../features/product/productReducer';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom';


function Products() {
    const [cookies,setCookies] = useCookies();
    const navigate = useNavigate();

    useEffect(() => {
        if(!cookies.token){
          alert("Login please")
          navigate('/signin')
        }
    },[])

    const [product, setProduct] = useState({
        name: "",
        category: "",
        price: 0,
        code: "",
        shippingCharges: 0,
        cgst: 0,
        sgst: 0
    });
    const dispatch = useDispatch();

    const handleOnChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });

    };
    const handleOnClick = (e) => {
        e.preventDefault();
        if (!product.name || !product.category || !product.price || !product.code || !product.shippingCharges || !product.cgst || !product.sgst) {
            alert("Please fill all the fields");
            return;
        }
        if(product.price<=0 || product.cgst<0 || product.sgst<0 || product.shippingCharges<0){
            alert("Please enter valid values");
            return;
        }

        dispatch(addProduct(product));
        setProduct({
            name: "",
            category: "",
            price: 0,
            code: "",
            shippingCharges: 0,
            cgst: 0,
            sgst: 0

        });


    };

    return (
        <div className='container'>
            <div className='container my-5 font-bold font-serif'>Add Products</div>
            <div className='container flex gap-5 flex-wrap my-5'>
                <div className="form-floating mx-2 " style={{ minWidth: "400px" }}>
                    <input
                        type="text"
                        name="name"
                        value={product.name}
                        className="form-control"
                        onChange={handleOnChange}
                        id="floatingInput"
                        placeholder="Customer Name"
                    />
                    <label htmlFor="floatingInput">Product Name</label>
                </div>
                <div className="form-floating mx-2" style={{ minWidth: "400px" }}>
                    <input
                        type="text"
                        name="category"
                        value={product.category}
                        onChange={handleOnChange}
                        className="form-control"
                        id="floatingInput"
                        placeholder="Customer Name"
                    />
                    <label htmlFor="floatingInput">Product Category</label>
                </div>
                <div className="form-floating mx-2 " style={{ minWidth: "400px" }}>
                    <input
                        type="number"
                        name="price"
                        value={product.price}
                        onChange={handleOnChange}
                        className="form-control"
                        id="floatingInput"
                        placeholder="Customer Name"
                    />
                    <label htmlFor="floatingInput">Product Price</label>
                </div>
                <div className="form-floating mx-2 " style={{ minWidth: "400px" }}>
                    <input
                        type="text"
                        name="code"
                        value={product.code}
                        onChange={handleOnChange}
                        className="form-control"
                        id="floatingInput"
                        placeholder="Product Code"
                    />
                    <label htmlFor="floatingInput">Product / HSN Code</label>
                </div>

                <div className="form-floating mx-2 " style={{ minWidth: "400px" }}>
                    <input
                        type="number"
                        name="shippingCharges"
                        value={product.shippingCharges}
                        onChange={handleOnChange}
                        className="form-control"
                        id="floatingInput"
                        placeholder="Shipping Charges"
                    />
                    <label htmlFor="floatingInput">Shipping Charges</label>
                </div>
                <div className="form-floating mx-2 " style={{ minWidth: "400px" }}>
                    <input
                        type="number"
                        name="cgst"
                        value={product.cgst}
                        onChange={handleOnChange}
                        className="form-control"
                        id="floatingInput"
                        placeholder="CGST"
                    />
                    <label htmlFor="floatingInput">CGST</label>
                </div>
                <div className="form-floating mx-2 " style={{ minWidth: "400px" }}>
                    <input
                        type="number"
                        name="sgst"
                        value={product.sgst}
                        onChange={handleOnChange}
                        className="form-control"
                        id="floatingInput"
                        placeholder="SGST"
                    />
                    <label htmlFor="floatingInput">SGST</label>
                </div>
                


                <div className='form-floating mx-2 my-2' >
                    <button  onClick={handleOnClick} className='btn btn-primary'>
                        Add Product
                    </button>
                </div>

            </div>
            <ShowProduct />
            

        </div>
    )
}

export default Products