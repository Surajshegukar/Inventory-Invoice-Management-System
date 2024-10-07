import React, { useEffect, useRef } from 'react';
import { PDFExport } from '@progress/kendo-react-pdf'
import jsPDF from 'jspdf'
import numberToWords from 'number-to-words';

const InvoiceTemplete = (props) => {
  const {invoice ,user } = props
  const pdfref = useRef(null)
  const downloadPdf = () => {

    pdfref.current.save();
  }
  
  
  console.log(invoice);
  const numberToWordsConverter = (num) => {
    return numberToWords.toWords(num).toUpperCase()+" ONLY";
  };

  let total = 0;
  let totalTax = 0;


  const data = {
    soldBy: {
      name: invoice.sellerName,
      address: invoice.sellerAddress,
      country: "IN",
      panNo: invoice.sellerPanNo,
      gstNo: invoice.sellerGstNo
    },
    billingAddress: {
      name: invoice.customerName,
      Address: invoice.customerAddress,
      stateCode: "29"
    },
    shippingAddress: {
      name: invoice.shippingName || invoice.customerName,
      Address: invoice.shippingAddress || invoice.customerAddress,
      stateCode: "29"
    },
    order: {
      number: invoice.orderNo,
      date: invoice.orderDate.slice(0, 10)
    },
    
    
    totalAmount:0 ,

    amountInWords: "One Thousand One Hundred And Ninety-five only",
    invoice: {
      number: invoice.invoiceNo,
      date: invoice.invoiceDate.slice(0, 10)
    },
  };


  const style = {
    invoice: {
      border: '1px solid black',
      padding: '20px',
      fontSize: '15px',
      fontFamily: 'Arial',
      fontStyle: 'sans-serif',
      margin: '20px',
      height: '100%',
    },
    header: {
      marginBottom: '20px'
    },
    section: {
      display: 'flex',
      justifyContent: 'space-between'
    },
    orderDetails: {
      marginBottom: '20px',
      position: 'relative',
      bottom: '80px'
    },
    table: {
      border: '1px solid black',
      marginBottom: '9px',
      width: '100%'
    },
    total: {
      marginBottom: '22px',
      position: 'relative',
      bottom: '10px',
      border:"1px solid black"
    },
    button: {
      cursor: 'pointer',
      padding: '10px 20px',
      backgroundColor: 'orange',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      fontSize: '16px'
    },
    buttonContainer: {
      display: 'flex',
      justifyContent: 'center',
      marginTop: '20px'
    },

    shippingAddress: {
      marginBottom: '20px', position: "relative", left: "60%", width: '40%'
    },
    billingAddress: {
      marginBottom: '20px', position: "relative", width: '40%'
    },
    tableSection: {
      marginBottom: '20px', position: 'relative', bottom: "70px"
    },
    td: {
      border: '1px solid black', padding: '10px', textAlign: 'left'
    },
    bold: {
      fontWeight: 'bold'
    }




  };
  return (
    <div>
      <PDFExport ref={pdfref} fileName="invoice" paperSize="C3">
        <div className="invoice" style={style.invoice}>

          <header style={style.header}>
            <h1 style={{ color: 'orange' }}>{user.name}</h1>
            <div style={{ position: "relative", top: "5px", left: "59%" }}>
              <h2>Tax Invoice/Bill of Supply/Cash Memo</h2>
              <h3>(Original for Recipient)</h3>
            </div>
          </header>

          <section style={style.section}>
            <div style={{ width: "40%" }} >
              <h4 style={style.bold}>Sold By:</h4>
              <p>{data.soldBy.name}</p>
              <p>{data.soldBy.address}</p>
              <p ><b>PAN No: </b>{data.soldBy.panNo}</p>
              <p ><b>GST Registration No:</b> {data.soldBy.gstNo}</p>
            </div>
            <div style={style.billingAddress} >
              <h4 style={style.bold}>Billing Address:</h4>
              <p>{data.billingAddress.name}</p>
              <p>{data.billingAddress.Address}</p>
              
            </div>
          </section>

          <section style={style.shippingAddress}>
            <h4 style={style.bold}>Shipping Address:</h4>
            <p>{data.shippingAddress.name}</p>
            <p>{data.shippingAddress.Address}</p>
            

            <p><b>Invoice Number:</b> {data.invoice.number}</p>
            <p><b>Invoice Date:</b> {data.invoice.date}</p>
            
          </section>

          <section style={style.orderDetails}>
            <h4><b>Order Details:</b></h4>
            <p><b>Order Number: </b>{data.order.number}</p>
            <p><b>Order Date:</b> {data.order.date}</p>
          </section>
          <section style={style.tableSection}>


            <table style={style.table} >
              <thead>
                <tr>
                  <th style={{width:"30px", border: '1px solid black' }}>Sl. No</th>
                  <th style={{ border: '1px solid black' }}>Product / Service</th>
                  <th style={{ border: '1px solid black' }}>Unit Price</th>
                  <th style={{ border: '1px solid black' }}>Qty</th>
                  <th style={{ border: '1px solid black' }}>Net Amount</th>
                  <th style={{ border: '1px solid black' }}>Tax Rate</th>
                  <th style={{ border: '1px solid black' }}>Tax Type</th>
                  <th style={{ border: '1px solid black' }}>Tax Amount</th>
                  <th style={{ border: '1px solid black' }}>Total Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoice.items.map((item, index) => {
                  const netAmount = parseInt(item.price) * parseInt(item.quantity);
                  const cgstAmount = (netAmount * parseInt(item.cgst)) / 100;
                  const sgstAmount = (netAmount * parseInt(item.sgst)) / 100;
                  const totalAmount = netAmount + cgstAmount + sgstAmount + parseInt(item.shippingCharges);
                  total += totalAmount;
                  totalTax += cgstAmount + sgstAmount;

                  return (
                    <tr key={index}>
                      <td style={style.td}>{index + 1}</td>
                      <td style={{border: '1px solid black', padding: '10px', textAlign: 'left',justifyContent:"left"}}>{item.name} ({item.code})
                        <td> Shipping Charges: + ${item.shippingCharges}</td>
                      </td>
                      <td style={style.td}>${item.price}</td>
                      <td style={style.td}>{item.quantity}</td>
                      <td style={style.td}>${netAmount.toFixed(2)}</td>
                      <td style={style.td}>{item.cgst + item.sgst}%</td>
                      <td style={style.td}>CGST & SGST</td>
                      <td style={style.td}>+{(cgstAmount + sgstAmount)}</td>
                      <td style={style.td}>${totalAmount}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>

            <div style={style.total}>
              <div>
                <table style={{ width: "100%" }}>
                  <tr style={{borderBottom:"1px solid black"}}>
                    <td style={{ width: "86%",fontWeight:"bold" }}>Total Amount: </td>
                    <td style={{fontWeight:"bold", width:'15%'}}>${totalTax.toFixed(2)}</td>
                    <td style={{fontWeight:"bold",width:'20%'}}>${total.toFixed(2)}</td>
                  </tr>
                  <tr>
                    <td style={{ width: "100%",fontWeight:"bold" }}>Amount in Words: {numberToWordsConverter(total)}</td>
                  </tr>
                </table>
              </div>
              <div className='footer position-absolute right-0 '>
                <p className='my-4'>For {invoice.sellerName}</p>
                <p className='my-5'>Authorized Signature</p>
             </div>
              
              
            </div>
            

          </section>


        </div>
      </PDFExport>
      <button style={style.button} onClick={downloadPdf}>Download PDF</button>
    </div>
  );
};


export default InvoiceTemplete;
