import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateInvoice,
  fetchInvoices,
  removeInvoice,
} from "../features/invoice/invoiceReducer";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";

import PrintInvoice from "../components/PrintInvoice";
import InvoiceTemplete from "../components/InvoiceTemplete";

function ShowInvoices() {
  const [cookies, setCookies] = useCookies();
  const navigate = useNavigate();
  const modalContentRef = useRef(null);

  const [isDownModelOn, setIsDownModelOn] = useState(false);
  const dispatch = useDispatch();
  const invoices = useSelector((state) => state.invoice.invoices);
  const user = useSelector((state) => state.auth.user);

  const [isModelOpen, setIsModelOpen] = useState(false);
  const [editInvoice, setEditInvoice] = useState({});
  const handleEditChange = (e) => {
    if (e.target.name === "shipping" && e.target.checked === false) {
      setEditInvoice({
        ...editInvoice,
        [e.target.name]: e.target.checked,
        shippingName: "",
        shippingAddress: "",
      });
      return;
    }
    if (e.target.name === "invoiceNo") {
      setEditInvoice({
        ...editInvoice,
        [e.target.name]: parseInt(e.target.value),
      });
      return;
    }

    setEditInvoice({ ...editInvoice, [e.target.name]: e.target.value });
  };

  const handleEditItemChange = (e, index) => {
    const { name, value } = e.target;

    if (name === "price" || name === "quantity") {
      setEditInvoice((prevState) => {
        const items = [...prevState.items];
        items[index] = { ...items[index], [name]: parseInt(value) };

        return { ...prevState, items };
      });
      return;
    }

    setEditInvoice((prevState) => {
      const items = [...prevState.items];
      items[index] = { ...items[index], [name]: value };

      return { ...prevState, items };
    });
  };

  const handleUpdateInvoice = (e) => {
    e.preventDefault();
    if (
      !editInvoice.customerName ||
      !editInvoice.customerAddress ||
      !editInvoice.customerMobile ||
      !editInvoice.customerEmail ||
      !editInvoice.invoiceNo ||
      !editInvoice.status ||
      !editInvoice.invoiceDate ||
      !editInvoice.orderDate ||
      !editInvoice.orderNo
    ) {
      alert("Please fill all the fields");
      return;
    }
    // if (editInvoice.customerMobile.length !== 10) {
    //     alert("Customer Mobile no. should be of 10 digits");
    //     return;
    // }
    if (!editInvoice.customerEmail.includes("@")) {
      alert("Email is not valid");
      return;
    }
    if (editInvoice.items.length === 0) {
      alert("Please add items");
      return;
    }
    if (
      editInvoice.items.some(
        (item) => item.name === "" || item.quantity === 0 || item.price === 0
      )
    ) {
      alert("Please fill all the fields in items");
      return;
    }
    dispatch(updateInvoice(editInvoice));
    setTimeout(() => {
      dispatch(fetchInvoices());
    }, 100);
    setIsModelOpen(false);
  };

  const [invoice, setInvoice] = useState({});

  const handleEdit = (e, invoice) => {
    e.preventDefault();
    setEditInvoice(invoice);
    setIsModelOpen(true);
    console.log(invoice);
  };

  const handleDelete = (e, id) => {
    e.preventDefault();
    dispatch(removeInvoice(id));
    setTimeout(() => {
      dispatch(fetchInvoices());
    }, 100);
  };
  useEffect(() => {
    if (!cookies.token) {
      alert("Login please");
      navigate("/signin");
    }
    dispatch(fetchInvoices());
  }, []);

  const handleDownload = (e, invoice) => {
    setInvoice(invoice);
    setIsDownModelOn(true);
  };
  return (
    <div className="container relative my-10 md:overflow-x-auto shadow-md sm:rounded-lg">
      <table className="w-full container text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
          <tr>
            <th scope="col" className="px-6 py-3">
              Invoice No.
            </th>

            <th scope="col" className="px-6 py-3">
              Customer Name
            </th>
            <th scope="col" className="px-6 py-3">
              Invoice Status
            </th>
            <th scope="col" className="px-6 py-3">
              Action
            </th>
          </tr>
        </thead>
        <tbody>
          {invoices.map((invoice, index) => {
            return (
              <tr
                key={index}
                className="odd:bg-white even:bg-gray-50 even:bg-gray-100 border-b"
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                >
                  {invoice.invoiceNo}
                </th>
                <td className="px-6 py-4">{invoice.customerName}</td>
                <td className="px-6 py-4">
                  {invoice.status === "Paid" ? (
                    <span className="bg-green-200 text-green-800 px-2 py-1 rounded-full">
                      Paid
                    </span>
                  ) : invoice.status === "Pending" ? (
                    <span className="bg-yellow-200 text-yellow-800 px-2 py-1 rounded-full">
                      Pending
                    </span>
                  ) : (
                    <span className="bg-red-200 text-red-800 px-2 py-1 rounded-full">
                      Cancelled
                    </span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <button
                    onClick={(e) => handleEdit(e, invoice)}
                    className="font-medium mx-2 text-blue-600 hover:underline"
                  >
                    Edit
                  </button>

                  <button
                    onClick={(e) => handleDownload(e, invoice)}
                    className="font-medium mx-2 text-green-600 hover:underline"
                  >
                    Download
                  </button>
                  <button
                    onClick={(e) => {
                      handleDelete(e, invoice._id);
                    }}
                    className="font-medium mx-2 text-red-600 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>

      {isDownModelOn && (
        <div
          id="large-modal"
          tabindex="-1"
          className={`fixed top-0 left-0 right-0 z-50 ${
            isDownModelOn ? "" : "hidden"
          }  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full`}
        >
          <div className="container relative w-full max-w-4xl max-h-full">
            <div className="relative bg-white rounded-lg shadow">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                <h3 className="text-xl font-medium text-gray-900">
                  Preview Invoice
                </h3>
                <button
                  onClick={() => setIsDownModelOn(false)}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                  data-modal-hide="extralarge-modal"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>

              <div className="p-4 md:p-5 space-y-4">
                <PrintInvoice
                  invoice={invoice}
                  user={user}
                  modalContentRef={modalContentRef}
                />
                {/* <InvoiceTemplete invoice = {invoice} user = {user}/> */}
              </div>
            </div>
          </div>
        </div>
      )}

      {isModelOpen && (
        <div
          id="crud-modal"
          tabindex="-1"
          aria-hidden="true"
          className={`${
            isModelOpen ? "" : "hidden"
          } overflow-y-scroll overflow-x-hidden fixed  z-50 justify-center items-center md:inset-0 h-[calc(100%-1rem)] max-h-full`}
        >
          <div className=" container relative p-4 w-full max-w-2xl max-h-full">
            <div className="relative bg-white rounded-lg shadow">
              <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t ">
                <h3 className="text-lg font-semibold text-gray-900">
                  Edit Invoice
                </h3>
                <button
                  onClick={() => {
                    setIsModelOpen(false);
                  }}
                  type="button"
                  className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                  data-modal-toggle="crud-modal"
                >
                  <svg
                    className="w-3 h-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 14"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeWidth="2"
                      d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                    />
                  </svg>
                  <span className="sr-only">Close modal</span>
                </button>
              </div>
              <form onSubmit={handleUpdateInvoice} className="p-4 md:p-5">
                <div className="grid gap-4 mb-4 grid-cols-4">
                  <div className="col-span-2">
                    <label
                      for="name"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Seller Name
                    </label>
                    <input
                      value={editInvoice.sellerName}
                      onChange={(e) => handleEditChange(e)}
                      type="text"
                      name="sellerName"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="Type product name"
                      required=""
                    />
                  </div>
                  <div className="col-span-2">
                    <label
                      for="address"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Seller Address
                    </label>
                    <input
                      value={editInvoice.sellerAddress}
                      onChange={(e) => handleEditChange(e)}
                      type="text"
                      name="sellerAddress"
                      id="address"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="Type product name"
                      required=""
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-2">
                    <label
                      for="email"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Seller Email
                    </label>
                    <input
                      value={editInvoice.sellerEmail}
                      onChange={(e) => handleEditChange(e)}
                      type="text"
                      name="sellerEmail"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="$2999"
                      required=""
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-2">
                    <label
                      for="SellerMobile"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Seller Mobile
                    </label>
                    <input
                      value={editInvoice.sellerMobile}
                      onChange={(e) => handleEditChange(e)}
                      type="number"
                      name="sellerMobile"
                      id="mobile"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="$2999"
                      required=""
                    />
                  </div>
                  <div className="col-span-2">
                    <label
                      for="name"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Customer Name
                    </label>
                    <input
                      value={editInvoice.customerName}
                      onChange={(e) => handleEditChange(e)}
                      type="text"
                      name="customerName"
                      id="name"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="Type product name"
                      required=""
                    />
                  </div>
                  <div className="col-span-2">
                    <label
                      for="name"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Address
                    </label>
                    <input
                      value={editInvoice.customerAddress}
                      onChange={(e) => handleEditChange(e)}
                      type="text"
                      name="customerAddress"
                      id="address"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="Type product name"
                      required=""
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-2">
                    <label
                      for="price"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Email
                    </label>
                    <input
                      value={editInvoice.customerEmail}
                      onChange={(e) => handleEditChange(e)}
                      type="text"
                      name="customerEmail"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="$2999"
                      required=""
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-2">
                    <label
                      for="customerMobile"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Mobile
                    </label>
                    <input
                      value={editInvoice.customerMobile}
                      onChange={(e) => handleEditChange(e)}
                      type="number"
                      name="customerMobile"
                      id="mobile"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="$2999"
                      required=""
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      for="price"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Invoice No.
                    </label>
                    <input
                      value={editInvoice.invoiceNo}
                      onChange={(e) => handleEditChange(e)}
                      type="text"
                      name="invoiceNo"
                      id="invoiceNo"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="$2999"
                      required=""
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-1">
                    <label
                      for="price"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Status
                    </label>
                    <select
                      value={editInvoice.status}
                      onChange={(e) => handleEditChange(e)}
                      name="status"
                      id="status"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      required=""
                    >
                      <option value="Paid">Paid</option>
                      <option value="Pending">Pending</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </div>
                  <div className="col-span-1 sm:col-span-1">
                    <label
                      for="invoice"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Invoice Date
                    </label>
                    <input
                      value={editInvoice.invoiceDate}
                      onChange={(e) => handleEditChange(e)}
                      type="date"
                      name="invoiceDate"
                      id="invoiceDate"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="dd-MM-yyyy"
                      required=""
                    />
                  </div>
                  <div className="col-span-1 sm:col-span-1">
                    <label
                      for="orderDate"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Due Date
                    </label>
                    <input
                      value={editInvoice.orderDate}
                      onChange={(e) => handleEditChange(e)}
                      type="date"
                      name="orderDate"
                      id="orderDate"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="dd-MM-yyyy"
                      required=""
                    />
                  </div>
                  <div className="col-span-2 sm:col-span-2">
                    <label
                      for="orderNo"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      Order No.
                    </label>
                    <input
                      value={editInvoice.orderNo}
                      onChange={(e) => handleEditChange(e)}
                      type="text"
                      name="orderNo"
                      id="orderNo"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                      placeholder="Type product name"
                      required=""
                    />
                  </div>
                  <div className="col-span-3 sm:col-span-3">
                    <input
                      type="checkbox"
                      name="shipping"
                      id="shipping"
                      checked={editInvoice.shipping}
                      onChange={(e) => handleEditChange(e)}
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block p-2.5"
                    />
                    <label
                      for="shipping"
                      className="block mb-2 text-sm font-medium text-gray-900"
                    >
                      is Shipping Address not same as Billing Address
                    </label>
                  </div>
                </div>
                {editInvoice.shipping && (
                  <div className="grid gap-4 mb-4 grid-cols-4">
                    <div className="col-span-2">
                      <label
                        for="name"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Shipping Name
                      </label>
                      <input
                        value={editInvoice.shippingName}
                        onChange={(e) => handleEditChange(e)}
                        type="text"
                        name="shippingName"
                        id="name"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Type product name"
                        required=""
                      />
                    </div>
                    <div className="col-span-2">
                      <label
                        for="name"
                        className="block mb-2 text-sm font-medium text-gray-900"
                      >
                        Shipping Address
                      </label>
                      <input
                        value={editInvoice.shippingAddress}
                        onChange={(e) => handleEditChange(e)}
                        type="text"
                        name="shippingAddress"
                        id="address"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                        placeholder="Type product name"
                        required=""
                      />
                    </div>
                  </div>
                )}
                <div>
                  {editInvoice.items &&
                    editInvoice.items.map((item, index) => {
                      return (
                        <div className="grid gap-3 mb-4 grid-cols-4">
                          <div className="col-span-2 sm:col-span-2">
                            <label
                              for="name"
                              className="block mb-2 text-sm font-medium text-gray-900"
                            >
                              Item Name
                            </label>
                            <input
                              value={editInvoice.items[index].name}
                              onChange={(e) => handleEditItemChange(e, index)}
                              type="text"
                              name="name"
                              id="name"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                              placeholder="Type product name"
                              required=""
                            />
                          </div>
                          <div className="col-span-2 sm:col-span-2">
                            <label
                              for="quantity"
                              className="block mb-2 text-sm font-medium text-gray-900"
                            >
                              Item Quantity
                            </label>
                            <input
                              value={editInvoice.items[index].quantity}
                              onChange={(e) => handleEditItemChange(e, index)}
                              type="number"
                              name="quantity"
                              id="quantity"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                              placeholder="$2999"
                              required=""
                            />
                          </div>
                          <div className="col-span-2 sm:col-span-2">
                            <label
                              for="price"
                              className="block mb-2 text-sm font-medium text-gray-900"
                            >
                              Item Price
                            </label>
                            <input
                              type="number"
                              value={editInvoice.items[index].price}
                              onChange={(e) => handleEditItemChange(e, index)}
                              name="price"
                              id="price"
                              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                              placeholder="$2999"
                              required=""
                            />
                          </div>
                          <div className="col-span-1 sm:col-span-2 my-4 p-1">
                            <button
                              onClick={(e) => {
                                e.preventDefault();
                                setEditInvoice((prevState) => {
                                  const items = [...prevState.items];
                                  items.splice(index, 1);
                                  return { ...prevState, items };
                                });
                              }}
                              type="button"
                              className="text-white inline-flex items-center bg-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                            >
                              <svg
                                className="me-1 -ms-1 w-5 h-5"
                                fill="currentColor"
                                viewBox="0 0 20 20"
                                xmlns="http://www.w3.org/2000/svg"
                              >
                                <path
                                  fill-rule="evenodd"
                                  d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                                  clip-rule="evenodd"
                                ></path>
                              </svg>
                              Delete
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  <div className=" my-4 relative left-3/4">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setEditInvoice((prevState) => {
                          const items = [...prevState.items];
                          items.push({ name: "", quantity: 0, price: 0 });
                          return { ...prevState, items };
                        });
                      }}
                      type="button"
                      className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center"
                    >
                      <svg
                        className="me-1 -ms-1 w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                          clip-rule="evenodd"
                        ></path>
                      </svg>
                      Add Item
                    </button>
                  </div>
                </div>
                <button
                  type="submit"
                  className="text-white inline-flex items-center bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
                >
                  <svg
                    className="me-1 -ms-1 w-5 h-5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
                      clip-rule="evenodd"
                    ></path>
                  </svg>
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ShowInvoices;
