import React, { useEffect, useState } from "react";
import customerReducer, {
  fetchCustomers,
} from "../features/customer/customerReducer";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../features/product/productReducer";
import { addInvoice } from "../features/invoice/invoiceReducer";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { fetchServices } from "../features/service/serviceReducer";
import { fetchSellers } from "../features/seller/sellerReducer";

function InvoicePage() {
  const [cookies, setCookies] = useCookies();
  const navigate = useNavigate();
  const [type, setType] = useState("");
  const [sellerOptions, setSellerOptions] = useState({});

  const [customer, setCustomer] = useState({
    invoiceNo: 0,
    customerName: "",
    customerAddress: "",
    customerMobile: 0,
    customerEmail: "",
    sellerName: "",
    sellerAddress: "",
    sellerMobile: 0,
    sellerEmail: "",
    sellerPanNo: "",
    sellerGstNo: "",
    type: "",
    items: [{}],
    invoiceDate: Date.now,
    orderDate: Date.now,
    status: "Pending",
  });

  const [customerOptions, setCustomerOptions] = useState({});

  const [items, setItems] = useState([
    {
      name: "",
      quantity: 1,
      price: 1,
      shippingCharges: 0,
      cgst: 0,
      sgst: 0,
      code: "",
    },
  ]);

  const customerList = useSelector((state) => state.customer.customers);
  const sellerList = useSelector((state) => state.seller.sellers);

  const [optionList, setOptionList] = useState([]);
  const productList = useSelector((state) => state.product.products);
  const serviceList = useSelector((state) => state.service.services);

  const handleOnSellerChange = (e) => {
    let seller = sellerList.find((seller) => seller.name === e.target.value);

    setCustomer({
      ...customer,
      sellerName: e.target.value,
      sellerAddress: seller.address,
      sellerMobile: seller.mobile,
      sellerEmail: seller.email,
      sellerPanNo: seller.panNo,
      sellerGstNo: seller.gstNo,
    });
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
    setCustomer({ ...customer, type: e.target.value });
    console.log(optionList);
  };
  useEffect(() => {
    if (type === "Product") {
      setOptionList(productList);
    }
    if (type === "Service") {
      setOptionList(serviceList);
    }
  }, [type]);

  const dispatch = useDispatch();

  useEffect(() => {
    if (!cookies.token) {
      alert("Login please");
      navigate("/signin");
    }
    dispatch(fetchCustomers());
    dispatch(fetchProducts());
    dispatch(fetchServices());
    dispatch(fetchSellers());
  }, [cookies.token]);

  const handleOnChange = (e) => {
    if (e.target.name === "invoiceNo") {
      setCustomer({ ...customer, [e.target.name]: parseInt(e.target.value) });
      return;
    }
    setCustomer({ ...customer, [e.target.name]: e.target.value });
    if (e.target.name === "customerName") {
      let selectedCustomer = customerList.find(
        (customer) => customer.customerName === e.target.value
      );
      console.log(selectedCustomer);
      setCustomer({
        ...customer,
        customerName: e.target.value,
        customerAddress: selectedCustomer.customerAddress,
        customerEmail: selectedCustomer.customerEmail,
        customerMobile: selectedCustomer.customerMobile,
      });
    }
  };

  const handleItemChange = (e, index) => {
    if (e.target.name === "name") {
      let item = optionList.find((item) => item.name === e.target.value);
      setItems((prevItems) => {
        prevItems[index] = {
          ...prevItems[index],
          [e.target.name]: e.target.value,
          price: item.price,
          shippingCharges: item.shippingCharges,
          cgst: item.cgst,
          sgst: item.sgst,
          code: item.code,
        };
        return prevItems;
      });
    }
    if (e.target.name === "quantity") {
      setItems((prevItems) => {
        prevItems[index] = {
          ...prevItems[index],
          [e.target.name]: e.target.value,
        };
        return prevItems;
      });
    }
    setCustomer({ ...customer, items: items });
  };
  const handleOnClick = (e) => {
    e.preventDefault();
    if (
      !customer.customerName ||
      !customer.invoiceNo ||
      !customer.sellerName ||
      !customer.invoiceDate ||
      !customer.orderDate ||
      !customer.status ||
      !customer.type
    ) {
      alert("Please fill all the fields");
      return;
    }
    if (customer.invoiceNo <= 0 || customer.orderNo <= 0) {
      alert("Invoice No. and Order No. should be greater than 0");
      return;
    }
    if (!customer.invoiceDate || !customer.orderDate) {
      alert("Please fill the date");
      return;
    }

    dispatch(addInvoice(customer)).then((res) => {
      if (res.meta.requestStatus === "fulfilled") {
        alert("Invoice added successfully");
      } else {
        alert("Error in adding invoice");
      }
    });

    setCustomer({
      invoiceNo: 0,
      customerName: "",
      customerAddress: "",
      customerMobile: 0,
      customerEmail: "",
      sellerName: "",
      sellerAddress: "",

      sellerMobile: 0,
      sellerEmail: "",
      sellerPanNo: "",
      sellerGstNo: "",
      type: "",
      items: [{}],
      invoiceDate: Date.now,
      orderDate: Date.now,
      status: "Pending",
    });
  };

  const handleAddItems = () => {
    setItems((prevItems) => [
      ...prevItems,
      {
        name: "",
        quantity: 1,
        price: 1,
      },
    ]);
  };
  const handleRemoveItems = (index) => {
    if (items.length === 1) {
      return;
    }
    setItems((prevItems) => prevItems.filter((item, i) => i !== index));
  };

  return (
    <div className="container">
      <div className="container my-5 font-bold font-serif ">Add Invoice</div>
      <div className="container flex gap-5 flex-wrap my-5">
        <div className="form-floating mx-2 " style={{ minWidth: "400px" }}>
          <select
            name="sellerName"
            value={customer.sellerName}
            className="form-control"
            onChange={handleOnSellerChange}
            id="floatingInput"
            placeholder="Seller Name"
          >
            <option value="">Select Seller</option>
            {sellerList.map((seller, index) => {
              return (
                <option key={index} value={seller.name}>
                  {seller.name}
                </option>
              );
            })}
          </select>
          <label htmlFor="floatingInput">Seller Name</label>
        </div>
        <div className="form-floating mx-2 " style={{ minWidth: "400px" }}>
          <select
            name="customerName"
            value={customer.customerName}
            className="form-control"
            onChange={handleOnChange}
            id="floatingInput"
            placeholder="Customer Name"
          >
            <option value="">Select Customer</option>
            {customerList.map((customer, index) => {
              return (
                <option key={index} value={customer.customerName}>
                  {customer.customerName}
                </option>
              );
            })}
          </select>
          <label htmlFor="floatingInput">Customer Name</label>
        </div>

        <div className="form-floating mx-2 " style={{ minWidth: "400px" }}>
          <input
            type="date"
            name="invoiceDate"
            value={customer.date}
            onChange={handleOnChange}
            className="form-control"
            id="floatingInput"
            placeholder="Date"
            dateformat="dd-MM-yyyy"
          />
          <label htmlFor="floatingInput">Date</label>
        </div>
        <div className="form-floating mx-2 " style={{ minWidth: "400px" }}>
          <input
            type="date"
            name="orderDate"
            value={customer.orderDate}
            onChange={handleOnChange}
            className="form-control"
            id="floatingInput"
            placeholder="Due Date"
            dateformat="dd-MM-yyyy"
          />
          <label htmlFor="floatingInput">Due Date</label>
        </div>
        <div className="form-floating mx-2" style={{ minWidth: "400px" }}>
          <input
            type="text"
            name="orderNo"
            value={customer.orderNo}
            onChange={handleOnChange}
            className="form-control"
            id="floatingInput"
            placeholder="Order No."
          />
          <label htmlFor="floatingInput">Order No.</label>
        </div>
        <div className="form-floating mx-2 " style={{ minWidth: "170px" }}>
          <select
            name="status"
            value={customer.status}
            onChange={handleOnChange}
            className="form-control"
            id="floatingInput"
            placeholder="Status"
          >
            <option value="Pending">Pending</option>
            <option value="Paid">Paid</option>
            <option value="Cancelled">Cancelled</option>
          </select>
          <label htmlFor="floatingInput">Status</label>
        </div>
        <div className="form-floating mx-2 " style={{ minWidth: "170px" }}>
          <select
            name="type"
            value={customer.type}
            onChange={handleTypeChange}
            className="form-control"
            id="floatingInput"
            placeholder="type"
          >
            <option value="">Select Type</option>
            <option value="Product">Product</option>
            <option value="Service">Service</option>
          </select>
          <label htmlFor="floatingInput">Type</label>
        </div>
        <div className="form-floating mx-2 " style={{ minWidth: "400px" }}>
          <input
            type="number"
            name="invoiceNo"
            value={customer.invoiceNo}
            onChange={handleOnChange}
            className="form-control"
            id="floatingInput"
            placeholder="Invoice No."
          />
          <label htmlFor="floatingInput">Invoice No.</label>
        </div>

        <div className="form-floating mx-2" style={{ minWidth: "400px" }}>
          <label htmlFor="billing">
            is Billing Address not same as Shipping Address
          </label>
          <input
            type="checkbox"
            onChange={(e) => {
              setCustomer({ ...customer, shipping: e.target.checked });
            }}
            name="shipping"
            id="shipping"
          />
        </div>
        {customer.shipping && (
          <div className="flex gap-5 flex-wrap my-3">
            <div className="form-floating mx-2 " style={{ minWidth: "400px" }}>
              <input
                type="text"
                name="shippingName"
                value={customer.shippingName}
                onChange={handleOnChange}
                className="form-control"
                id="floatingInput"
                placeholder="Shipping Name"
              />
              <label htmlFor="floatingInput">Shipping Name</label>
            </div>

            <div className="form-floating mx-2 " style={{ minWidth: "400px" }}>
              <input
                type="text"
                name="shippingAddress"
                value={customer.shippingAddress}
                onChange={handleOnChange}
                className="form-control"
                id="floatingInput"
                placeholder="Shipping Address"
              />
              <label htmlFor="floatingInput">Shipping Address</label>
            </div>
          </div>
        )}

        {items.map((item, index) => {
          return (
            <div key={index} className="container flex gap-3 flex-wrap my-1">
              <div className="form-floating" style={{ minWidth: "400px" }}>
                <select
                  name="name"
                  value={item.name}
                  className="form-control"
                  onChange={(e) => handleItemChange(e, index)}
                  id="floatingInput"
                  placeholder="Item Name"
                >
                  <option value="">Select Item</option>
                  {optionList.map((option, index) => {
                    return (
                      <option key={index} value={option.name}>
                        {option.name}
                      </option>
                    );
                  })}
                </select>
                <label htmlFor="floatingInput">Item Name</label>
              </div>
              <div className="form-floating" style={{ minWidth: "400px" }}>
                <input
                  type="number"
                  name="quantity"
                  value={item.quantity}
                  onChange={(e) => handleItemChange(e, index)}
                  className="form-control"
                  id="floatingInput"
                  placeholder="Item Quantity"
                />
                <label htmlFor="floatingInput">Item Quantity</label>
              </div>

              <button onClick={handleAddItems} className="btn btn-primary">
                Add +
              </button>

              <button
                className="btn btn-danger"
                onClick={() => {
                  handleRemoveItems(index);
                }}
              >
                Delete
              </button>
            </div>
          );
        })}
        <div className="form-floating mx-2 my-2">
          <button onClick={(e) => handleOnClick(e)} className="btn btn-primary">
            Add Invoice
          </button>
        </div>
      </div>
    </div>
  );
}

export default InvoicePage;
